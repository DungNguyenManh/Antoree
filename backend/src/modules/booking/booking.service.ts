import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    ) { }

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const createdBooking = new this.bookingModel(createBookingDto);
        return createdBooking.save();
    }


    async findAll(): Promise<Booking[]> {
        return this.bookingModel.find().exec();
    }

    async findByStudentId(studentId: string): Promise<Booking[]> {
        return this.bookingModel.find({ studentId }).exec();
    }

    async findOne(id: string): Promise<Booking | null> {
        return this.bookingModel.findById(id).exec();
    }
}
