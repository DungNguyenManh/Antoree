import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    
    return next.handle().pipe(
      map(data => {
        // Nếu data đã có format chuẩn, trả về nguyên
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }
        
        // Tự động transform thành format chuẩn
        return {
          success: true,
          statusCode: response.statusCode || 200,
          message: 'Operation completed successfully',
          data,
          timestamp: new Date().toISOString()
        };
      })
    );
  }
}
