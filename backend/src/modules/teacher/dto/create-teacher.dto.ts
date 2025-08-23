import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateTeacherDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    languages?: string[];
}