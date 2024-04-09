import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateMovementDto } from './dto/create-movement.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findSingleAccount(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }



  @Post(':id/movements')
  createMovement(@Param('id') id: string, @Body() createMovementDto: CreateMovementDto) {
    return this.accountsService.createMovement(id, createMovementDto);
  }

  @Get(':id/movements')
  findMovements(@Param('id') id: string) {
    return this.accountsService.findAllMovements(id);
  }

  @Get(':accountId/movements/:movementId')
  findOneMovement(@Param('accountId') accountId: string, @Param('movementId') movementId: string) {
    return this.accountsService.findOneMovements(accountId, movementId);
  }

  @Delete(':accountId/movements/:movementId')
  removeMovement(@Param('accountId') accountId: string, @Param('movementId') movementId: string) {
    return this.accountsService.removeMovement(accountId, movementId);
  }
}
