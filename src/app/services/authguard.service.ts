import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras,
    CanLoad, Route
} from '@angular/router';
import { AuthService } from './authservice.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        if (this.checkLogin(url)) {
            if (this.checkLock(url)) {
                console.log('Lock State');
                this.router.navigate(['/lock']);
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    checkLock(url: string): boolean {
        if (this.authService.isLocked()) {
            return true;
        }
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            this.authService.updateCookieTime();
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Create a dummy session id
        // let sessionId = this.randomIntFromInterval(123212321, 988989009);

        // Set our navigation extras object
        // that contains our global query params and fragment
        // let navigationExtras: NavigationExtras = {
        //     queryParams: { 'session_id': sessionId },
        //     fragment: 'anchor'
        // };

        // Navigate to the login page with extras
        // this.router.navigate(['/login'], navigationExtras);
        this.authService.logout();
        return false;
    }

    randomIntFromInterval(min, max): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}
