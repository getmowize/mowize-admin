import { Routes } from '@angular/router';

import { UsersComponent } from './list/users.component';
import { UserDetailComponent } from './details/userdetails.component';

export const UsersRoutes: Routes = [
    {
        path: '',
        component: UsersComponent
    }, {
        path: 'details',
        component: UserDetailComponent
    }
];
