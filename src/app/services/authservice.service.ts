import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

const redirectUrl: string = "login";

@Injectable()
export class AuthService {

    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(): Observable<boolean> {
        this.isLoggedIn = true;
        return Observable.of(this.isLoggedIn);
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}