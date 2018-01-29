import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice.service';
import PerfectScrollbar from 'perfect-scrollbar';
import swal from 'sweetalert2';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/users',
        title: 'Users',
        type: 'link',
        icontype: 'person'
    },
    {
        path: '/channelpartners',
        title: 'Channel Partners',
        type: 'link',
        icontype: 'supervisor_account'
    },
    {
        path: '/masterdata',
        title: 'Master Data',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'master_data',
        children: [
            { path: 'category', title: 'Category Management', ab: 'CM' },
            { path: 'records', title: 'Record Management', ab: 'RM' },
            { path: 'timeline', title: 'Timeline Management', ab: 'TM' },
            { path: '#', title: 'Company Management', ab: 'CM' },
            { path: 'professions', title: 'Profession Management', ab: 'PM' }
        ]
    },
    {
        path: '/data',
        title: 'Data Management',
        type: 'sub',
        icontype: 'file_upload',
        collapse: 'data_management',
        children: [
            { path: 'stocks', title: 'Stocks', ab: 'S' },
            { path: 'mutualfunds', title: 'Mutual Funds', ab: 'MF' },
            { path: 'dividend', title: 'Dividend', ab: 'D' },
            { path: 'facevalue', title: 'Face Value', ab: 'FV' }
        ]
    },
    {
        path: '/emails',
        title: 'Emailer',
        type: 'link',
        icontype: 'email'
    },
    {
        path: '#',
        title: 'FinFacts',
        type: 'link',
        icontype: 'information'
    }
];

//Menu Items
// export const ROUTES: RouteInfo[] = [{
//     path: '/dashboard',
//     title: 'Dashboard',
//     type: 'link',
//     icontype: 'dashboard'
// }, {
//     path: '/components',
//     title: 'Components',
//     type: 'sub',
//     icontype: 'apps',
//     collapse: 'components',
//     children: [
//         { path: 'buttons', title: 'Buttons', ab: 'B' },
//         { path: 'grid', title: 'Grid System', ab: 'GS' },
//         { path: 'panels', title: 'Panels', ab: 'P' },
//         { path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA' },
//         { path: 'notifications', title: 'Notifications', ab: 'N' },
//         { path: 'icons', title: 'Icons', ab: 'I' },
//         { path: 'typography', title: 'Typography', ab: 'T' }
//     ]
// }, {
//     path: '/forms',
//     title: 'Forms',
//     type: 'sub',
//     icontype: 'content_paste',
//     collapse: 'forms',
//     children: [
//         { path: 'regular', title: 'Regular Forms', ab: 'RF' },
//         { path: 'extended', title: 'Extended Forms', ab: 'EF' },
//         { path: 'validation', title: 'Validation Forms', ab: 'VF' },
//         { path: 'wizard', title: 'Wizard', ab: 'W' }
//     ]
// }, {
//     path: '/tables',
//     title: 'Tables',
//     type: 'sub',
//     icontype: 'grid_on',
//     collapse: 'tables',
//     children: [
//         { path: 'regular', title: 'Regular Tables', ab: 'RT' },
//         { path: 'extended', title: 'Extended Tables', ab: 'ET' },
//         { path: 'datatables.net', title: 'Datatables.net', ab: 'DT' }
//     ]
// }, {
//     path: '/maps',
//     title: 'Maps',
//     type: 'sub',
//     icontype: 'place',
//     collapse: 'maps',
//     children: [
//         { path: 'google', title: 'Google Maps', ab: 'GM' },
//         { path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM' },
//         { path: 'vector', title: 'Vector Map', ab: 'VM' }
//     ]
// }, {
//     path: '/widgets',
//     title: 'Widgets',
//     type: 'link',
//     icontype: 'widgets'

// }, {
//     path: '/charts',
//     title: 'Charts',
//     type: 'link',
//     icontype: 'timeline'

// }, {
//     path: '/calendar',
//     title: 'Calendar',
//     type: 'link',
//     icontype: 'date_range'
// }, {
//     path: '/pages',
//     title: 'Pages',
//     type: 'sub',
//     icontype: 'image',
//     collapse: 'pages',
//     children: [
//         { path: 'pricing', title: 'Pricing', ab: 'P' },
//         { path: 'timeline', title: 'Timeline Page', ab: 'TP' },
//         { path: 'login', title: 'Login Page', ab: 'LP' },
//         { path: 'register', title: 'Register Page', ab: 'RP' },
//         { path: 'lock', title: 'Lock Screen Page', ab: 'LSP' },
//         { path: 'user', title: 'User Page', ab: 'UP' }
//     ]
// }
// ];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(private auth: AuthService) {

    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    logout(): void {
        swal({
            title: 'Are you sure you want to log out?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Yes',
            buttonsStyling: false
        }).then(() => {
            this.auth.logout();
        }).catch(swal.noop);
    }

    changePassword(): void {
        swal({
            title: 'Change Password',
            html: `
            <div class="row" style="text-align:left;">
                <div class="col-md-12">
                    <div class="form-group label-floating">
                        <label class="control-label">New Password</label>
                        <input id="newpassword" type="password" class="form-control">
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group label-floating">
                        <label class="control-label">Confirm Password</label>
                        <input id="confirmpassword" type="password" class="form-control">
                    </div>
                </div>
            </div>`,
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (result) {
            var newpass = $('#newpassword').val();
            var confirmpass = $('#confirmpassword').val();
            console.log(newpass);
            console.log(confirmpass);

            if (newpass === confirmpass) {
                swal({
                    type: 'success',
                    html: '<strong>Password Updated</strong>',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });

            } else {
                swal({
                    type: 'error',
                    text: 'Your passwords does not match',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }

        }).catch(swal.noop);
    }
}
