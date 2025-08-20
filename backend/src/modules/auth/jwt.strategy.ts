// Nhận role từ payload và trả về trong req.user.
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly config: ConfigService) {
        super({
            secretOrKey: config.get<string>('JWT_ACCESS_SECRET', ''),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }
    async validate(payload: { sub: string; email: string; role: 'user' | 'admin' }) {
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}