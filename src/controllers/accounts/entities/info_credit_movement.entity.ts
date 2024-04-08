import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { AccountType } from "./account_type.entity";
import { MovementType } from "./movement_type.entity";
import { MovementSubtype } from "./movement_subtype.entity";

export type InfoCreditMovementDocument = HydratedDocument<InfoCreditMovement>;

@Schema({ timestamps: true })
export class InfoCreditMovement {
  @Prop({
    default: false
  })
  settled: boolean;

  @Prop({
    default: undefined
  })
  msi: number;

  @Prop({
    default: undefined,
    ref: MovementType.name
  })
  msiMovementId: MovementType;
}

export const InfoCreditMovementSchema = SchemaFactory.createForClass(InfoCreditMovement);