import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { DataService } from 'app/services/data.service';
import swal from 'sweetalert2';

import { User } from '../../model/user';
import { MowizeService } from '../../services/mowize.service';
import { Router } from '@angular/router';
import { INVALID } from '@angular/forms/src/model';
import { isDate } from 'util';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

    public dataTable: DataTable;
    users: User[] = [];
    tableData: string[][] = [];

    constructor(private mowizeService: MowizeService,
        private dataService: DataService,
        private router: Router,
        public datepipe: DatePipe
    ) { }

    ngOnInit() {
        this.dataTable = {
            headerRow: ['#', 'Id', 'Name', 'Email', 'Channel', 'D1', 'DA', 'YOB', 'Reg Date', 'Plan', 'Actions'],
            footerRow: ['#', 'Id', 'Name', 'Email', 'Channel', 'D1', 'DA', 'YOB', 'Reg Date', 'Plan', 'Actions'],
            dataRows: []
        };

        this.mowizeService.getListOfUsers()
            .then(result => {
                console.log(result);
                this.users = result;

                const table = $('#usersTable').DataTable();
                table.destroy();

                var tableData: string[][] = [];

                this.users.forEach(user => {

                    var row: string[] = [];

                    row.push((this.users.indexOf(user) + 1) + '');
                    row.push(user.id + '');
                    row.push(user.name);
                    row.push(user.email);
                    row.push(user.agentCode);
                    row.push(user.assetCount + '');
                    row.push(user.accountCount + '');
                    var year;
                    if (user.dob.toString() === 'Invalid Date') {
                        year = '---';
                    } else {
                        year = this.datepipe.transform(user.dob, 'yyyy');
                    }
                    row.push(year);
                    row.push(this.datepipe.transform(user.createdOn, 'dd MMM yyyy'));
                    row.push(user.plan);
                    row.push(user.status + '');

                    tableData.push(row);
                    this.dataTable.dataRows.push(row);
                });

                $('#datatables').DataTable({
                    'pagingType': 'full_numbers',
                    'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
                    responsive: true,
                    data: this.dataTable.dataRows,
                    language: {
                        search: '_INPUT_',
                        searchPlaceholder: 'Search records',
                    }
                });

                // Block a record
                table.on('click', '.block', function (e: any) {
                    const $tr = $(this).closest('tr');
                    swal({
                        title: 'Are you sure you want to block this user?',
                        text: 'You may unblock him later, but his apps will stop working',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false
                    }).then(function () {
                        swal({
                            title: 'Blocked!',
                            text: 'This user has been blocked',
                            type: 'success',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                        table.draw();
                    }).catch(swal.noop);
                });

                //UnBlock record
                table.on('click', '.unblock', function (e: any) {
                    const $tr = $(this).closest('tr');
                    swal({
                        title: 'Do you want to unblock this user?',
                        text: 'This will enable all his services',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false
                    }).then(function () {
                        swal({
                            title: 'Unblocked!',
                            text: 'This user has been unblocked',
                            type: 'success',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                        table.draw();
                    }).catch(swal.noop);
                });

                // this.users.forEach(user => {

                //     var row: string[] = [];

                //     row.push((this.users.indexOf(user) + 1) + '');
                //     row.push(user.id + '');
                //     row.push(user.name);
                //     row.push(user.email);
                //     row.push(user.agentCode);
                //     row.push(user.assetCount + '');
                //     row.push(user.accountCount + '');

                //     var year;
                //     if (user.dob.toString() === 'Invalid Date') {
                //         year = '---';
                //     } else {
                //         year = this.datepipe.transform(user.dob, 'yyyy');
                //     }

                //     row.push(year);
                //     row.push(this.datepipe.transform(user.createdOn, 'dd MMM yyyy'));
                //     row.push(user.plan);

                //     var actions: string;
                //     if (user.status === 1) {
                //         actions = `<div class="text-right">
                //                 <button class="btn btn-simple btn-info btn-icon view">
                //                     <i class="material-icons">open_in_browser</i>
                //                 </button>
                //                 <button class="btn btn-simple btn-success btn-icon block">
                //                     <i class="material-icons">account_circle</i>
                //                 </button>
                //             </div>`;
                //     }
                //     if (user.status === 2) {
                //         console.log('Status 2');
                //         actions = `<div class="text-right">
                //                 <button class="btn btn-simple btn-info btn-icon view">
                //                     <i class="material-icons">open_in_browser</i>
                //                 </button>
                //                 <button class="btn btn-simple btn-success btn-icon unblock">
                //                     <i class="material-icons">account_circle</i>
                //                 </button>
                //             </div>`;
                //     }
                //     row.push(actions);
                //     table.row.add(row).draw(false);

                // });
            });
    }

    ngAfterViewInit() {

        // $('#datatables').DataTable({
        //     'pagingType': 'full_numbers',
        //     'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
        //     responsive: true,
        //     language: {
        //         search: '_INPUT_',
        //         searchPlaceholder: 'Search records',
        //     }

        // });

        // const table = $('#usersTable').DataTable();

        // // // Block a record
        // // table.on('click', '.view', function (e: any) {
        // //     const $tr = this.closest('tr');
        // //     const data = table.row($tr).data();
        // //     console.log(data);
        // //     // this.openUser(data);
        // // });


        // // Block a record
        // table.on('click', '.block', function (e: any) {
        //     const $tr = $(this).closest('tr');
        //     swal({
        //         title: 'Are you sure you want to block this user?',
        //         text: 'You may unblock him later, but his apps will stop working',
        //         type: 'warning',
        //         showCancelButton: true,
        //         confirmButtonText: 'Yes',
        //         cancelButtonText: 'No',
        //         confirmButtonClass: 'btn btn-success',
        //         cancelButtonClass: 'btn btn-danger',
        //         buttonsStyling: false
        //     }).then(function () {
        //         swal({
        //             title: 'Blocked!',
        //             text: 'This user has been blocked',
        //             type: 'success',
        //             confirmButtonClass: 'btn btn-success',
        //             buttonsStyling: false
        //         });
        //         table.draw();
        //     }).catch(swal.noop);
        // });

        // //UnBlock record
        // table.on('click', '.unblock', function (e: any) {
        //     const $tr = $(this).closest('tr');
        //     swal({
        //         title: 'Do you want to unblock this user?',
        //         text: 'This will enable all his services',
        //         type: 'warning',
        //         showCancelButton: true,
        //         confirmButtonText: 'Yes',
        //         cancelButtonText: 'No',
        //         confirmButtonClass: 'btn btn-success',
        //         cancelButtonClass: 'btn btn-danger',
        //         buttonsStyling: false
        //     }).then(function () {
        //         swal({
        //             title: 'Unblocked!',
        //             text: 'This user has been unblocked',
        //             type: 'success',
        //             confirmButtonClass: 'btn btn-success',
        //             buttonsStyling: false
        //         });
        //         table.draw();
        //     }).catch(swal.noop);
        // });

    }

    exportToExcel() {
        // console.log(this.dataTable);
        new Angular2Csv(this.dataTable.dataRows, 'UsersList');
    }

    openUser(data: string[]) {
        console.log('Data' + data);
        var position: number = +data[0];

        const user: User = this.users[position];
        this.dataService.setUser(user);
        this.router.navigate(['/users/details']);
    }
}
