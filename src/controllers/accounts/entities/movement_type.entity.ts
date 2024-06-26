import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MovementTypeDocument = HydratedDocument<MovementType>;

@Schema()
export class MovementType {
  @Prop()
  _id: number;

  @Prop()
  name: string;
}

export const MovementTypeSchema = SchemaFactory.createForClass(MovementType);