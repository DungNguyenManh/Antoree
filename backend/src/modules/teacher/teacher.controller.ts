import { Controller, Get, Post, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) { }

    @Post()
    create(@Body() createTeacherDto: CreateTeacherDto) {
        return this.teacherService.create(createTeacherDto);
    }

    // API upload avatar
    @Post('upload-avatar')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/avatars',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueSuffix + extname(file.originalname));
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.match(/^image\//)) {
                    return cb(new Error('Only image files are allowed!'), false);
                }
                cb(null, true);
            },
        })
    )
    uploadAvatar(@UploadedFile() file: Multer.File) {
        if (!file) {
            return { success: false, message: 'No file uploaded' };
        }
        // Trả về URL truy cập ảnh (giả sử backend phục vụ static folder uploads)
        const url = `/uploads/avatars/${file.filename}`;
        return { success: true, url };
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
