import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                console.log('ResponseInterceptor data:', data);
                if (
                    data &&
                    typeof data === 'object' &&
                    'statusCode' in data &&
                    'status' in data &&
                    'message' in data &&
                    'data' in data
                ) {
                    return data;
                }
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    status: true,
                    message: 'Request successful',
                    data,
                };
            }),
        );
    }
}