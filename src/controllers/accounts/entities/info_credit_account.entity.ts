import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type InfoCreditAccountDocument = HydratedDocument<InfoCreditAccount>;

@Schema({ _id: false })
export class InfoCreditAccount {
  @Prop()
  limit: number;

  @Prop()
  cutoffDay: number;

  @Prop()
  daysPaymentLimit: number;

  @Prop()
  monthlyDebt: number;

  @Prop()
  datesConfiguration: string;
}

export const InfoCreditAccountSchema = SchemaFactory.createForClass(InfoCreditAccount);