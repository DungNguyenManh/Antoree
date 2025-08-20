import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Package extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    lessons: number;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
