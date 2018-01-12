import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/authguard.service';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { UsersModule } from 'app/users/users.module';

export const AppRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'users',
                canActivate: [AuthGuard],
                loadChildren:'./users/users.module#UsersModule'
            }, {
                path: 'components',
                canActivate: [AuthGuard],
                loadChildren: './components/components.module#ComponentsModule'
            }, {
                path: 'forms',
                canActivate: [AuthGuard],
                loadChildren: './forms/forms.module#Forms'
            }, {
                path: 'tables',
                canActivate: [AuthGuard],
                loadChildren: './tables/tables.module#TablesModule'
            }, {
                path: 'maps',
                canActivate: [AuthGuard],
                loadChildren: './maps/maps.module#MapsModule'
            }, {
                path: 'widgets',
                canActivate: [AuthGuard],
                loadChildren: './widgets/widgets.module#WidgetsModule'
            }, {
                path: 'charts',
                canActivate: [AuthGuard],
                loadChildren: './charts/charts.module#ChartsModule'
            }, {
                path: 'calendar',
                canActivate: [AuthGuard],
                loadChildren: './calendar/calendar.module#CalendarModule'
            }
        ]
    }, {
        path: '**',
        component: PageNotFoundComponent
    }
];

// export const AppRoutes: Routes = [
//     {
//       path: '',
//       redirectTo: 'dashboard',
//       pathMatch: 'full',
//     }, {
//       path: '',
//       component: AdminLayoutComponent,
//       children: [
//           {
//         path: '',
//         loadChildren: './dashboard/dashboard.module#DashboardModule'
//     }, {
//         path: 'components',
//         loadChildren: './components/components.module#ComponentsModule'
//     }, {
//         path: 'forms',
//         loadChildren: './forms/forms.module#Forms'
//     }, {
//         path: 'tables',
//         loadChildren: './tables/tables.module#TablesModule'
//     }, {
//         path: 'maps',
//         loadChildren: './maps/maps.module#MapsModule'
//     }, {
//         path: 'widgets',
//         loadChildren: './widgets/widgets.module#WidgetsModule'
//     }, {
//         path: 'charts',
//         loadChildren: './charts/charts.module#ChartsModule'
//     }, {
//         path: 'calendar',
//         loadChildren: './calendar/calendar.module#CalendarModule'
//     }, {
//         path: '',
//         loadChildren: './userpage/user.module#UserModule'
//     }, {
//         path: '',
//         loadChildren: './timeline/timeline.module#TimelineModule'
//     }
//   ]}, {
//       path: '',
//       component: AuthLayoutComponent,
//       children: [{
//         path: 'pages',
//         loadChildren: './pages/pages.module#PagesModule'
//       }]
//     }
// ];
