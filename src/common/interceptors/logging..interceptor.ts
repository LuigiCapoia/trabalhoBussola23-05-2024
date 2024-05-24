// logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LogService } from 'src/logs/log.service';
import { Log } from 'src/logs/schemas/log.schema';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const route = request.url;
    const now = Date.now();

    return next.handle().pipe(
      tap(async () => {
        const responseTime = `${Date.now() - now}ms`;
        const log: Log = { method, route, response_time: responseTime, timestamp: new Date() };
        await this.logService.createLog(log);
        console.log(`After... ${responseTime}`);
      }),
      catchError(async (err) => {
        const log: Log = { method, route, error_message: err.message, timestamp: new Date() };
        await this.logService.createLog(log);
        throw err;
      })
    );
  }
}
