import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';


// We are using injectable because we need the AuthService to retrieve token
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return next.handle(req); Old method to follow the sent request without appending or settings some informations
        const copiedRequest = req.clone({params: new HttpParams().append('auth', this.authService.getToken())});
        return next.handle(copiedRequest);
    }
}
