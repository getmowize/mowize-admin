import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/authguard.service';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { LockComponent } from 'app/lock/lock.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'lock',
        component: LockComponent
    }, {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthGuard],
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'users',
                canActivate: [AuthGuard],
                loadChildren: './users/users.module#UsersModule'
            }, {
                path: 'channelpartners',
                canActivate: [AuthGuard],
                loadChildren: './channelpartners/channelpartner.module#ChannelPartnerModule'
            }, {
                path: 'emails',
                canActivate: [AuthGuard],
                loadChildren: './emailer/emailer.module#EmailerModule'
            }, {
                path: 'data',
                canActivate: [AuthGuard],
                loadChildren: './data/data.module#DataModule'
            }, {
                path: 'masterdata',
                canActivate: [AuthGuard],
                loadChildren: './masterdata/masterdata.module#MasterDataModule'
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
