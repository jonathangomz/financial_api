import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Movement } from "./movement.entity";

export type InfoCreditMovementDocument = HydratedDocument<InfoCreditMovement>;

@Schema({ _id: false })
export class InfoCreditMovement {
  @Prop({
    default: false
  })
  settled: boolean;

  @Prop({
    default: undefined
  })
  months: number;

  @Prop({    
    default: undefined,
    type: Types.ObjectId,
    ref: 'movements'
  })
  deferredMovement: Movement;
}

export const InfoCreditMovementSchema = SchemaFactory.createForClass(InfoCreditMovement);