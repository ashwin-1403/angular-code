import { Injectable, } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    loginObj: any = []
    constructor(
        private router: Router,
        private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const access_token = localStorage.getItem('access_token');
        if (access_token && !req.url.includes("amazonaws")) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer' + ' ' + access_token)
            });
        }

        return next.handle(req).pipe(catchError(err => {

            if (err.status == 401) {
                localStorage.clear();
                this.router.navigate(['login'])
            }

            if (err.status == 400) {
                this.toastr.error(err.error.data);
            }

            if (err.status == 402) {
                this.router.navigate(['page-not-found'])
            }

            return throwError(err);
        }));
    }
}
