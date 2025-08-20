import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './schemas/package.schema';

@Injectable()
export class PackageService {
    constructor(
        @InjectModel(Package.name) private packageModel: Model<Package>,
    ) { }

    async create(createPackageDto: CreatePackageDto): Promise<Package> {
        const createdPackage = new this.packageModel(createPackageDto);
        return createdPackage.save();
    }

    async findAll(): Promise<Package[]> {
        return this.packageModel.find().exec();
    }

    async findOne(id: string): Promise<Package | null> {
        return this.packageModel.findById(id).exec();
    }
}
