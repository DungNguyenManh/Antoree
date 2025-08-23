import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
    @Prop({ required: true })
    studentId: string;

    @Prop({ required: true })
    teacherId: string;

    @Prop({ required: true })
    time: string; // ISO string

    @Prop()
    note?: string;

    @Prop({ default: 'pending' })
    status: 'pending' | 'confirmed' | 'cancelled';
}

export const BookingSchema = SchemaFactory.createForClass(Booking);