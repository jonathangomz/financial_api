import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.entity';
import { Movement, MovementSchema } from './entities/movement.entity';
import { InfoCreditAccount, InfoCreditAccountSchema } from './entities/info_credit_account.entity';
import { InfoCreditMovement, InfoCreditMovementSchema } from './entities/info_credit_movement.entity';
import { AccountType, AccountTypeSchema } from './entities/account_type.entity';
import { MovementType, MovementTypeSchema } from './entities/movement_type.entity';
import { MovementSubtype, MovementSubtypeSchema } from './entities/movement_subtype.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Account.name, schema: AccountSchema },
    { name: InfoCreditAccount.name, schema: InfoCreditAccountSchema },
    { name: Movement.name, schema: MovementSchema },
    { name: InfoCreditMovement.name, schema: InfoCreditMovementSchema },
    { name: AccountType.name, schema: AccountTypeSchema },
    { name: MovementType.name, schema: MovementTypeSchema },
    { name: MovementSubtype.name, schema: MovementSubtypeSchema },
  ])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
