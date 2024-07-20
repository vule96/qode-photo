import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
      this.trimStrings(request.body);
    }

    return next.handle().pipe(
      map((data) => {
        const result = {
          statusCode: 200,
          metadata: data,
          message: 'Success',
        };
        return result;
      })
    );
  }

  private trimStrings(data: any): any {
    if (data instanceof Object) {
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'string') {
          if (data[key].trim() == '') {
            data[key] = undefined;
          }
        } else if (data[key] instanceof Object) {
          this.trimStrings(data[key]);
        }
      });
    }
  }
}
