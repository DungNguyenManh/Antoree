import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';

@Controller('package')
export class PackageController {
    constructor(private readonly packageService: PackageService) { }

    @Post()
    create(@Body() createPackageDto: CreatePackageDto) {
        return this.packageService.create(createPackageDto);
    }

    @Get()
    findAll() {
        return this.packageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.packageService.findOne(id);
    }
}
