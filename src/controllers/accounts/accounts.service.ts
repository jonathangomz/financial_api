import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './entities/account.entity';
import { Model } from 'mongoose';
import { Movement } from './entities/movement.entity';
import { AccountType } from './entities/account_type.entity';
import { CreateMovementDto } from './dto/create-movement.dto';
import { MovementType } from './entities/movement_type.entity';
import { Tag } from './entities/tag.entity';
import { InfoCreditMovement } from './entities/info_credit_movement.entity';
import { InfoCreditAccount } from './entities/info_credit_account.entity';
import { UpdateMovementDto } from './dto/update-movement.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(InfoCreditAccount.name) private infoCreditAccountModel: Model<InfoCreditAccount>,
    @InjectModel(AccountType.name) private accountTypeModel: Model<AccountType>,
    @InjectModel(Movement.name) private movementModel: Model<Movement>,
    @InjectModel(InfoCreditMovement.name) private infoCreditMovementModel: Model<InfoCreditMovement>,
    @InjectModel(MovementType.name) private movementTypeModel: Model<MovementType>,
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const type = await this.accountTypeModel.findOne({ identifier: createAccountDto.type });
    if(!type) {
      throw new NotFoundException('No se encontró el tipo');
    }

    let infoCreditAccount: InfoCreditAccount;
    if(type.identifier === 'CREDIT') {
      infoCreditAccount = new this.infoCreditAccountModel({ ...createAccountDto, limit: createAccountDto.total });
    }

    const createdAccount = new this.accountModel({
      ...createAccountDto,
      type,
      infoCreditAccount
    });
    await createdAccount.save();

    return createdAccount;
  }

  findAll() {
    return this.accountModel.find({ owner: 'jonathangomz', deletedAt: undefined }).select({ 'movements': false, '__v': false });
  }

  findSingleAccount(id: string) {
    return this.findOne(id).select({ 'movements': false, '__v': false, 'type._id': false });
  }

  findOne(id: string, ignoreDeleted: boolean = true) {
    const parameters = {
      _id: id,
      owner: 'jonathangomz'
    };

    if(ignoreDeleted) {
      parameters['deletedAt'] = undefined
    }

    return this.accountModel.findOne(parameters);
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  async remove(id: string) {
    // Search for the account
    const account = await this.findOne(id);
    if(!account) {
      throw new NotFoundException('No se encontró la cuenta');
    }

    // Set the deletion date
    account.deletedAt = new Date();
    await account.save();

    return account;
  }

  // Movements
  async createMovement(accountId: string, createMovementDto: CreateMovementDto) {
    // Search for the account
    const account = await this.findOne(accountId);
    if(!account) {
      throw new NotFoundException('No se encontró la cuenta');
    }

    // Search for the movement type
    const type = await this.movementTypeModel.findById(createMovementDto.type);
    if(!type) {
      throw new NotFoundException('No se encontró el tipo');
    }

    // Search for the tag
    let tag: Tag;
    if(createMovementDto.tag) {
      tag = await this.tagModel.findById(createMovementDto.tag);
      if(!tag) {
        throw new NotFoundException('No se encontró la etiqueta');
      }
    }

    // If is a credit account create the default extra credit information for the movement
    let infoCreditMovement: InfoCreditMovement;
    if(account.type.identifier === 'CREDIT') {
      if(createMovementDto.months) {
        // deferred purchase
        infoCreditMovement = new this.infoCreditMovementModel({ ...createMovementDto });
      } else if(createMovementDto.deferredMovementId) {
        // deferred purchase payment
        const deferredMovement = await this.accountModel.findOne({ movements: createMovementDto.deferredMovementId });
        if(!deferredMovement) {
          throw new NotFoundException('No se encontró el movimiento con ese Id');
        }

        infoCreditMovement = new this.infoCreditMovementModel({ deferredMovement });
      } else {
        // default credit movement
        infoCreditMovement = new this.infoCreditMovementModel();
      }
    }

    // Save the movement
    let createdMovement = new this.movementModel({
      ...createMovementDto,
      type,
      tag,
      infoCreditMovement,
      account: accountId
    });
    await createdMovement.save();

    // Updates the total and save the id of the new movement
    account.total = account.total + createdMovement.amount;
    account.movements.push(createdMovement.id);
    await account.save();

    return createdMovement;
  }

  async findAllMovements(accountId: string) {
    // Search for the account
    const account = await this.findOne(accountId).populate('movements', {'__v': false}, this.movementModel, { 'deletedAt': undefined });
    if(!account) {
      throw new NotFoundException('No se encontró la cuenta');
    }

    return account.movements;
  }

  async findOneMovements(accountId: string, movementId: string) {
    // Search for the account
    const account = await this.findOne(accountId);
    if(!account) {
      throw new NotFoundException('No se encontró la cuenta');
    }

    // Search for the movement
    const movement = this.movementModel.findById(movementId);
    if(!movement) {
      throw new NotFoundException('No se encontró el movimiento');
    }

    return movement;
  }

  async updateMovement(accountId: string, movementId: string, updateMovementDto: UpdateMovementDto) {
    // Search for the account
    const account = await this.findOne(accountId);
    if(!account) {
      throw new NotFoundException('No se encontró la cuenta');
    }

    // Search for the movement
    const oldMovement = await this.movementModel.findById(movementId);
    if(!oldMovement) {
      throw new NotFoundException('No se encontró el movimiento');
    }

    const updatedMovement = await this.movementModel.updateOne({ _id: oldMovement._id }, { ...updateMovementDto });

    // If the amount change then recalculate the total
    if(updateMovementDto.amount) {
      // Revert the last total
      account.total = account.total + (oldMovement.amount * -1);
      // Apply the new amount
      account.total = account.total + updateMovementDto.amount;
      await account.save();  
    }

    return updatedMovement;
  }

  async removeMovement(accountId: string, movementId: string) {
    // Search for the account
    const account = await this.findOne(accountId);
    if(!account) {
      throw new NotFoundException('No se encontró la cuenta');
    }

    // Search for the movement
    const movement = await this.movementModel.findById(movementId);
    if(!movement) {
      throw new NotFoundException('No se encontró el movimiento');
    }

    // Set the deletion date
    movement.deletedAt = new Date();
    await movement.save();

    // Reverse the total
    account.total = account.total + (movement.amount * -1);
    await account.save();

    return movement;
  }
}
