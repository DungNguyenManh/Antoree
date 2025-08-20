//Trả role vào token.

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { ApiResponse, UserResponse } from '../../common/interfaces/api-response.interface';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) { }

  async register(email: string, password: string): Promise<ApiResponse<UserResponse>> {
    const exists = await this.users.findByEmail(email);
    if (exists) throw new ConflictException('Email already used');
    
    const user = await this.users.create({ email, password });
    
    return {
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      timestamp: new Date().toISOString()
    };
  }

  async login(email: string, password: string): Promise<ApiResponse<UserResponse> & { token: string }> {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    
    const accessToken = this.signAccessToken(user.id.toString(), user.email, user.role);
    
    return {
      success: true,
      statusCode: 200,
      message: 'Login successful',
      data: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      token: accessToken,
      timestamp: new Date().toISOString()
    };
  }

  signAccessToken(userId: string, email: string, role: 'user' | 'admin') {
    const payload = { sub: userId, email, role };
    return this.jwt.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    });
  }
}