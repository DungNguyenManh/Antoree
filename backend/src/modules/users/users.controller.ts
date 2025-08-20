import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, Req, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(AuthGuard('jwt'))  // Bảo vệ tất cả endpoints
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Req() req: any) {
    // Chỉ admin mới được xem tất cả users
    const user = req.user;
    if (user.role !== 'admin') {
      throw new ForbiddenException('Access denied. Admin role required to view all users.');
    }
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Req() req: any, @Param('id') id: string) {
    const user = req.user;

    // Admin có thể xem bất kỳ user nào
    if (user.role === 'admin') {
      return this.usersService.findOne(id);
    }

    // User thường chỉ được xem thông tin của chính mình
    if (user.userId !== id) {
      throw new ForbiddenException('Access denied. You can only view your own profile.');
    }

    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Req() req: any, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;

    // Admin có thể cập nhật bất kỳ user nào
    if (user.role === 'admin') {
      return this.usersService.update(id, updateUserDto);
    }

    // User thường chỉ được cập nhật thông tin của chính mình
    if (user.userId !== id) {
      throw new ForbiddenException('Access denied. You can only update your own profile.');
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    const user = req.user;

    // Admin có thể xóa bất kỳ user nào
    if (user.role === 'admin') {
      return this.usersService.remove(id);
    }

    // User thường chỉ được xóa tài khoản của chính mình
    if (user.userId !== id) {
      throw new ForbiddenException('Access denied. You can only delete your own account.');
    }

    return this.usersService.remove(id);
  }
}
