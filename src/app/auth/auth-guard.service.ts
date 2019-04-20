import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../shared/auth.service';
import Swal from "sweetalert2";
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isAuthenticated()) {
            Swal.fire({
                title: 'Authentication required',
                text: 'You are not allowed to access this page',
                confirmButtonText: 'Ok',
                type: 'error'
            });
            return false;
        }
        return true;
    }
}
