import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
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
    findAll(@Query('name') name?: string) {
        if (name) {
            return this.teacherService.findByName(name);
        }
        return this.teacherService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.teacherService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<CreateTeacherDto>) {
        return this.teacherService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.teacherService.remove(id);
    }
}