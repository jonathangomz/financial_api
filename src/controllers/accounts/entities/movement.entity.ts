import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { MovementType } from "./movement_type.entity";
import { Tag } from "./tag.entity";
import { InfoCreditMovement } from "./info_credit_movement.entity";
import { Account } from "./account.entity";

export type MovementDocument = HydratedDocument<Movement>;

@Schema({ timestamps: true })
export class Movement {
  @Prop({ ref: MovementType.name })
  type: MovementType;

  @Prop({ ref: Tag.name })
  tag: Tag;

  @Prop()
  place: string;

  @Prop()
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop()
  amount: number;
  
  @Prop()
  online: boolean;

  @Prop({ required: false, ref: InfoCreditMovement.name })
  infoCreditMovement: InfoCreditMovement;

  @Prop({ default: undefined })
  deletedAt: Date;

  @Prop({type: Types.ObjectId, ref: 'Account'})
  account: Account;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);