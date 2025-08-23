import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './schemas/teacher.schema';

@Injectable()
export class TeacherService {
    constructor(
        @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    ) { }

    async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
        const createdTeacher = new this.teacherModel(createTeacherDto);
        return createdTeacher.save();
    }

    async findAll(): Promise<Teacher[]> {
        return this.teacherModel.find().exec();
    }

    async findOne(id: string): Promise<Teacher | null> {
        return this.teacherModel.findById(id).exec();
    }
}