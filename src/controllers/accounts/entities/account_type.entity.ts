import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AccountTypeDocument = HydratedDocument<AccountType>;

@Schema()
export class AccountType {
  @Prop()
  name: string;
}

export const AccountTypeSchema = SchemaFactory.createForClass(AccountType);