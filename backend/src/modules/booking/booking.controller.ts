import { Controller, Get, Post, Body, Param, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post()
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingService.create(createBookingDto);
    }

    @Get()
    async findAll(@Req() req: any) {
        const user = req.user;
        if (user.role === 'admin') {
            return this.bookingService.findAll();
        }
        // user thường chỉ xem booking của mình
        if (!user.userId) {
            throw new ForbiddenException('User not authenticated');
        }
        return this.bookingService.findByStudentId(user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookingService.findOne(id);
    }
}