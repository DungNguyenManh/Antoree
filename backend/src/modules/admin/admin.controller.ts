// Tạo module/controller cho admin xem users và todos của từng user.
import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Admin } from '../../common/decorators/admin.decorator';
import { UsersService } from '../users/users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('admin')
export class AdminController {
    constructor(private readonly users: UsersService) { }

    @Get('users')
    async listUsers(@Admin() adminUser: any) {
        // Admin decorator đã kiểm tra quyền, adminUser chứa thông tin user admin
        return this.users.findAll();
    }


    @Post('users/:userId/make-admin')
    async makeUserAdmin(@Admin() adminUser: any, @Param('userId') userId: string) {
        // Chỉ admin mới có thể thay đổi role của user khác
        const updatedUser = await this.users.setRole(userId, 'admin');
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return {
            success: true,
            message: `User ${updatedUser.email} is now admin`,
            data: updatedUser
        };
    }

    @Post('users/:userId/make-user')
    async makeUserRegular(@Admin() adminUser: any, @Param('userId') userId: string) {
        // Chỉ admin mới có thể thay đổi role của user khác
        const updatedUser = await this.users.setRole(userId, 'user');
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return {
            success: true,
            message: `User ${updatedUser.email} is now regular user`,
            data: updatedUser
        };
    }
}