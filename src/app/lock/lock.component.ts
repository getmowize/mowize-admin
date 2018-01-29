import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/authservice.service';

declare var $: any;

@Component({
    selector: 'app-lock-cmp',
    templateUrl: './lock.component.html'
})

export class LockComponent implements OnInit {

    passcode = "";

    test: Date = new Date();

    constructor(private router: Router, private authService: AuthService) {

    }
    ngOnInit() {
        if (this.authService.isLoggedIn() === false) {
            this.router.navigate(['/login']);
        } else {
            this.authService.lock();
            setTimeout(function () {
                // after 1000 ms we add the class animated to the login/register card
                $('.card').removeClass('card-hidden');
            }, 700);
        }

    }

    unlock() {
        if (this.passcode === 'nikkhil') {
            this.authService.unlock();
            this.router.navigate(['/dashboard']);
        } else {
            this.passcode = '';
        }
    }
}
