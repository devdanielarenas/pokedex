import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { RefreshService } from './refresh.service';
import { StorageService } from './storage.service';

@Injectable()
export class InterceptorService implements HttpInterceptor{

  token = 'access';
  refresh = 'refresh';

  constructor(
    public observeAuth: StorageService,
    private ngxSpinnerService: NgxSpinnerService,
    private refreshService: RefreshService,
    private alertService: AlertService
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('accessToken');
    const eToken = localStorage.getItem('eToken');
    let authReq = req;
    if (authToken) {
      authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
    }
    if (eToken) {
      authReq = req.clone({ headers: req.headers.set('e-token', `${eToken}`) });
    }
    return next.handle(authReq).pipe(catchError(err => {
      switch (err.status) {
        case 400: {
          this.alertService.message('Parámetros inválidos o no enviados', 'error');
          break;
        }
        case 401: {
          const refresh = JSON.parse(localStorage.getItem(this.refresh));
          if (refresh) {
            this.refreshService.update(localStorage.getItem('refreshToken'), {}).subscribe(data => {
              this.observeAuth.setItem('accessToken', data[this.token]);
              localStorage.setItem('refreshToken', data[this.refresh]);
              localStorage.setItem('user', JSON.stringify(data));
              this.ngxSpinnerService.hide();
            }, error => {
              this.observeAuth.clear();
              this.alertService.message('Sesión expirada', 'error');
              this.ngxSpinnerService.hide();
            });
          } else {
            this.observeAuth.clear();
            if (err.error?.detail) {
              this.alertService.message(err.error.detail, 'error');
            }
            this.ngxSpinnerService.hide();
          }
          break;
        }
        case 500: {
          this.alertService.message('Error en el servidor', 'error');
          break;
        }
        default: {
          if (err.error?.detail) {
            this.alertService.message(err.error.detail, 'error');
          }
          break;
        }
      }
      this.ngxSpinnerService.hide();
      return throwError(err);
    }));
  }

}
