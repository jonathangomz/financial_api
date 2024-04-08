import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MovementType } from "./movement_type.entity";
import { MovementSubtype } from "./movement_subtype.entity";
import { InfoCreditMovement } from "./info_credit_movement.entity";

export type MovementDocument = HydratedDocument<Movement>;

@Schema({ timestamps: true })
export class Movement {
  @Prop({ref: MovementType.name})
  type: MovementType;

  @Prop({ref: MovementSubtype.name})
  subtype: MovementSubtype;

  @Prop()
  place: string;

  @Prop()
  title: string;

  @Prop({required: false})
  description: string;

  @Prop()
  amount: number;
  
  @Prop()
  online: boolean;

  @Prop({required: false, ref: InfoCreditMovement.name})
  infoCreditMovement: InfoCreditMovement;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);