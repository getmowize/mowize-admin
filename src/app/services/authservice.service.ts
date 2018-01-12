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

    login(): Observable<boolean> {
        this.cookieService.set(this.loginCookie, 'true', 0.01, '', '');
        return Observable.of(this.isLoggedIn());
    }

    logout(): void {
        console.log('Logging Out');
        this.cookieService.delete(this.loginCookie);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        console.log('Getting all cookies');
        console.log(this.cookieService.getAll());
        console.log(this.cookieService.check(this.loginCookie));
        return this.cookieService.check(this.loginCookie);
    }

    updateCookieTime(): void {
        this.cookieService.set(this.loginCookie, 'true', 0.01, '', '');
    }
}
