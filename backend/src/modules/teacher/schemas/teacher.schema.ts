import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Teacher extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    bio?: string;

    @Prop()
    avatarUrl?: string;

    @Prop([String])
    languages?: string[];

    @Prop([String])
    availableTimes?: string[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
