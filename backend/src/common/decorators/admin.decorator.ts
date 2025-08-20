import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const Admin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }
    
    if (user.role !== 'admin') {
      throw new ForbiddenException('Access denied. Admin role required.');
    }
    
    return user;
  },
);
