import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TaskDocument = Task & Document

@Schema()
export class Task {
	@Prop()
	text: string

	@Prop()
	done: boolean
}

export const TaskSchema = SchemaFactory.createForClass(Task)