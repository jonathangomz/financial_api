import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MovementSubtypeDocument = HydratedDocument<MovementSubtype>;

@Schema()
export class MovementSubtype {
  @Prop()
  name: string;
}

export const MovementSubtypeSchema = SchemaFactory.createForClass(MovementSubtype);