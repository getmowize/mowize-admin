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

    fromDate: Date;
    toDate: Date;

    maxDate = new Date();

    platform: string = '';
    status: string = '';
    gender: string = '';

    constructor(private mowizeService: MowizeService,
        private dataService: DataService,
        private router: Router,
        public datepipe: DatePipe
    ) {
        this.dataService.removeUser();
    }

    ngOnInit() {
        this.dataTable = {
            headerRow: ['#', 'Id', 'Name', 'Email', 'Channel', 'D1', 'DA', 'YOB', 'Reg Date', 'Plan', 'Actions'],
            footerRow: ['#', 'Id', 'Name', 'Email', 'Channel', 'D1', 'DA', 'YOB', 'Reg Date', 'Plan', 'Actions'],
            dataRows: []
        };

        this.getUsersFromServer('', '', '', '', '');
    }

    getUsersFromServer(fromDate: string, toDate: string, selectedPlatform: string, selectedGender: string, selectedStatus: string): void {
        this.mowizeService.getListOfUsers(fromDate, toDate, selectedPlatform, selectedGender, selectedStatus)
            .then(result => {
                this.users = result;
                this.dataTable.dataRows = [];
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

                    this.dataTable.dataRows.push(row);
                });

                this.refreshTable();
            });
    }


    ngAfterViewInit() {
    }

    makeDataTable() {
        $('#datatables').DataTable({
            search: true,
            sort: true,
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }
        });

        const table = $('#usersTable').DataTable();
    }

    exportToExcel() {
        new Angular2Csv(this.dataTable.dataRows, 'UsersList');
    }

    searchWithDates() {
        var from = '';
        if (this.fromDate === undefined) {
            from = '';
        } else {
            from = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
        }

        var to = '';
        if (this.toDate === undefined) {
            to = '';
        } else {
            to = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
        }

        this.getUsersFromServer(from, to, this.platform, this.gender, this.status);
    }

    openUser(userId: string) {
        this.dataService.setUser(userId);
        this.router.navigate(['/users/details']);
    }

    blockUser(userId: string, position: number, userName: string) {
        swal({
            title: 'Are you sure you want to block ' + userName + ' ?',
            text: 'You may unblock him later, but his apps will stop working',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(() => {
            this.mowizeService.blockOrUnblockUser(userId, '2')
                .then(result => {
                    if (result === true) {
                        swal({
                            title: 'Blocked!',
                            text: userName + ' has been blocked',
                            type: 'success',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                        var row = this.dataTable.dataRows[position - 1];
                        row[10] = '2';
                        this.refreshTable();
                    } else {
                        swal({
                            title: 'Unable to block user!',
                            text: userName + ' was not blocked',
                            type: 'error',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                    }
                });
        }).catch(swal.noop);

    }

    unblockUser(userId: string, position: number, userName: string) {
        swal({
            title: 'Do you want to unblock ' + userName + ' ?',
            text: 'This will enable all his services',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
            
        }).then(() => {
            this.mowizeService.blockOrUnblockUser(userId, '1')
                .then(result => {
                    if (result === true) {
                        swal({
                            title: 'Unblocked!',
                            text: userName + ' has been unblocked',
                            type: 'success',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                        var row = this.dataTable.dataRows[position - 1];
                        row[10] = '1';
                        this.refreshTable();
                    } else {
                        swal({
                            title: 'Unable to unblock user!',
                            text: userName + ' was not unblocked',
                            type: 'error',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                    }
                });
        }).catch(swal.noop);

    }

    refreshTable() {
        const table = $('#usersTable').DataTable();
        table.destroy();

        var self = this;
        setTimeout(function () {
            self.makeDataTable();
        }, 10);
    }

}
