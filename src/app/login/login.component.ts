import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authservice.service';
import { MowizeService } from '../services/mowize.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    login: FormGroup;

    copyrightDate: Date = new Date();
    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private mowizeService: MowizeService,
        private router: Router) {
    }

    ngOnInit() {
        setTimeout(function () {
            // after 200 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 200);

        this.login = this.formBuilder.group({

            // To add a validator, we must first convert the string value into an array. 
            // The first item in the array is the default value if any, then the next item in the array is the validator. 
            // Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            username: [null, [Validators.required]],

            // We can use more than one validator per field. 
            // If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function.
            // Here we are using a required, minimum length and maximum length validator.
            password: ['', Validators.required]
        });
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }

    }

    onLogin() {
        if (this.login.valid) {
            const username = this.login.get('username').value;
            const password = this.login.get('password').value;
            this.mowizeService.login(username, password).then(admin => {
                if (admin === null) {
                    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
                    const color = Math.floor((Math.random() * 6) + 1);

                    $.notify({
                        icon: 'notifications',
                        message: '<b>Wrong Credentials</b> - Please try again'
                    }, {
                            type: type[color],
                            timer: 1000,
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            }
                        }
                    );

                } else {
                    this.authService.login(admin.id);
                    this.router.navigate(['/dashboard']);
                }
            });

        } else {
            this.validateAllFormFields(this.login);
        }
    }
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }
    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            console.log(field);
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

}
