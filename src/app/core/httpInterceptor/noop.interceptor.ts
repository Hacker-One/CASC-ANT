import { Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpHeaderResponse} from '@angular/common/http';
import { merge, Observable, of} from 'rxjs';
import { catchError, mergeMap } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import {LoadingService} from '../services';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private messageService: NzMessageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpHeaderResponse | HttpResponse<any>> {
    function urlSplit() {
      if (req.url.includes('?')) {
        return req.url.split('?')[0];
      } else {
        return req.url;
      }
    }

    let headersConfig = {};

    // 上传修改Content-Type
    const formType = new Set([
      '/system/uploadfile'
    ]);
    if (formType.has(urlSplit())) {
      headersConfig = {};
    } else {
      headersConfig = {
        'Content-Type': 'application/json',
      };
    }

    const customerRequest = req.clone({
      setHeaders: headersConfig,
    });

    return next.handle(customerRequest).pipe( mergeMap((event: any) => {
        /**
         * 后端直接返回数据，常用错误返回http状态码400，所以response不需要二次处理
         */
        if (event instanceof HttpResponse) {
          if (event.status === 200 && event.body.resultCode && event.body.resultCode !== '0' && event.body.resultCode !== '409') {
            switch (event.body.resultCode) {
              case '300':
                this.messageService.error('参数重复,请重新输入参数');
                break;
              default:
                this.messageService.error(event.body.resultMsg);
            }
          }
          return of(event);
        }
        return of(event);
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  /**
   * 业务码判断
   */
  private handleError(event: HttpErrorResponse): Observable<any> {
    LoadingService.close();
    switch (event.status) {
      default:
        this.messageService.error('网络异常,请联系管理员');
        return throwError(event);
    }
  }
}
