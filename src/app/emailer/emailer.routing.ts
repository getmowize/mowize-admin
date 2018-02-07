import { Routes } from '@angular/router';

import { EmailsComponent } from './emails/emails.component';
import { EmailDetailsComponent } from 'app/emailer/emaildetails/emaildetails.component';

export const EmailsRoutes: Routes = [
    {
        path: '',
        component: EmailsComponent
    }, {
        path: 'details',
        component: EmailDetailsComponent
    }
];
