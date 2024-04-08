import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { AccountType } from "./account_type.entity";

export type InfoCreditAccountDocument = HydratedDocument<InfoCreditAccount>;

@Schema({ timestamps: true })
export class InfoCreditAccount {
  @Prop()
  limit: number;

  @Prop()
  cutoffDate: Date;

  @Prop()
  daysPaymentLimit: number;

  @Prop()
  monthlyDebt: number;

  @Prop()
  datesConfiguration: string;
}

export const InfoCreditAccountSchema = SchemaFactory.createForClass(InfoCreditAccount);