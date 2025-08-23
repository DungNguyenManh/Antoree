import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Teacher extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    bio?: string;

    @Prop([String])
    languages?: string[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);