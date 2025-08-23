import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) { }

    @Post()
    create(@Body() createTeacherDto: CreateTeacherDto) {
        return this.teacherService.create(createTeacherDto);
    }

    @Get()
    findAll() {
        return this.teacherService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.teacherService.findOne(id);
    }
}