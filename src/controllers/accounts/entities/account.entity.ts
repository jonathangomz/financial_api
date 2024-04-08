import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { AccountType } from "./account_type.entity";
import { InfoCreditAccount } from "./info_credit_account.entity";

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
  @Prop()
  name: string;

  @Prop()
  total: number;

  @Prop({ref: AccountType.name})
  type: AccountType;

  @Prop({required:false, ref: InfoCreditAccount.name})
  infoCreditAccount: InfoCreditAccount;
}

export const AccountSchema = SchemaFactory.createForClass(Account);