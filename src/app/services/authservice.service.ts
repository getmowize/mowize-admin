import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

const redirectUrl: string = "login";

@Injectable()
export class AuthService {

    loginCookie = 'mowizeadmin';

    constructor(private cookieService: CookieService, private router: Router) { }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(adminId: string): Observable<boolean> {
        this.cookieService.set(this.loginCookie, 'true', 0.01, '', '');
        localStorage.setItem('adminId', adminId);
        return Observable.of(this.isLoggedIn());
    }

    logout(): void {
        this.cookieService.delete(this.loginCookie);
        localStorage.removeItem('adminId');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return this.cookieService.check(this.loginCookie);
    }

    updateCookieTime(): void {
        this.cookieService.set(this.loginCookie, 'true', 0.01, '', '');
    }

    getAdminId(): string {
        return localStorage.getItem('adminId');
    }
}
