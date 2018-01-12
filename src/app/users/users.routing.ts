import { Routes } from '@angular/router';

import { UsersComponent } from './list/users.component';

export const UsersRoutes: Routes = [
    {

        path: '',
        children: [{
            path: 'users',
            component: UsersComponent
        }]
    }
];