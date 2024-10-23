import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  text: string;

  @Prop()
  isDone: boolean;

  @Prop({ type: Date, default: Date.now })
  createdDate: Date;

  @Prop({ type: Date, default: Date.now })
  updatedDate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
