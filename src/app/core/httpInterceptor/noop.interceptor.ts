import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpHeaderResponse} from '@angular/common/http';
import { merge, Observable, of} from 'rxjs';
import { catchError, mergeMap } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpHeaderResponse | HttpResponse<any>> {

    const headersConfig = {
      'Content-Type': 'application/json',
    };

    const customerRequest = req.clone({
      setHeaders: headersConfig,
    });

    return next.handle(customerRequest).pipe( mergeMap((event: any) => {
      /**
       * 后端直接返回数据，常用错误返回http状态码400，所以response不需要二次处理
       */
      if (event instanceof HttpResponse) {
        return of(event);
      }
      return of(event);
    }),
    catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  /**
   * 业务码判断
   * readme: http://10.81.21.233:10080/ferrari/FlyfishMgr
   * params: {401: 身份验证，403: 没有权限, 500: 服务异常}
   * 400: {4001: "参数不能为空"; 4002: "参数格式错误"; 4003: "参数已过期"; 4004: "参数不匹配", 4005: "次数已用完"; 4006: "没有数据"}
   */
  private handleError(event: HttpErrorResponse): Observable<any> {
    switch (event.status) {
      case 401: case 403:
        if (event instanceof HttpErrorResponse) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
          return throwError(event);
        }
        break;
      case 400:
        if (event instanceof HttpErrorResponse) {
          const body: any = event.error;
          // ToastService.error(body.msg);
          return throwError(event);
        }
        break;
      case 500:
        if (event instanceof HttpErrorResponse) {
          const body: any = event.error;
          return throwError(event);
        }
        break;
      default:
        return throwError(event);
    }
  }
}
