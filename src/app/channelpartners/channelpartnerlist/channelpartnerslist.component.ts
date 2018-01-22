import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { DataService } from 'app/services/data.service';
import swal from 'sweetalert2';

import { ChannelPartner } from '../../model/channelpartner';
import { MowizeService } from '../../services/mowize.service';
import { Router } from '@angular/router';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-channel-partners-list',
    templateUrl: './channelpartnerslist.component.html',
    styleUrls: ['./channelpartnerslist.component.css']
})
export class ChannelPartnersListComponent implements OnInit, AfterViewInit {

    public dataTable: DataTable;
    channelPartners: ChannelPartner[] = [];

    constructor(private mowizeService: MowizeService,
        private dataService: DataService,
        private router: Router
    ) { }

    ngOnInit() {
        this.dataTable = {
            headerRow: ['#', 'Name', 'AgentId', 'Creation Date', '+25', '-25', 'Code', 'Annual', '5 year', 'Earnings', 'Contact No', 'Actions'],
            footerRow: ['#', 'Name', 'AgentId', 'Creation Date', '+25', '-25', 'Code', 'Annual', '5 year', 'Earnings', 'Contact No', 'Actions'],
            // dataRows: [    
            //     ['Airi Satou', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
            //     ['Angelica Ramos', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
            //     ['Ashton Cox', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple']
            // ]
            dataRows: []
        };
        this.mowizeService.getListOfChannelPartners()
            .then(result => {
                this.channelPartners = result;
                // this.setDataTable();
                // const table = $('#usersTable').DataTable();
                // table.row().remove;
                // this.users.forEach(user => {
                //     table.row.add([
                //         user.id + '',
                //         user.name,
                //         user.email,
                //         user.agentCode,
                //         user.assetCount + '',
                //         user.accountCount + '',
                //         user.dob + '',
                //         user.createdOn + '',
                //         user.plan,
                //         `<div class="text-right">
                //             <button class="btn btn-simple btn-info btn-icon view" matTooltip="View" [matTooltipPosition]="'below'">
                //                 <i class="material-icons">open_in_browser</i>
                //             </button>
                //             <button *ngIf="{{user.status}} === 1" class="btn btn-simple btn-success btn-icon block" matTooltip="Block" [matTooltipPosition]="'below'">
                //                 <i class="material-icons">account_circle</i>
                //             </button>
                //             <button *ngIf="{{user.status}} === 2" class="btn btn-simple btn-danger btn-icon unblock" matTooltip="Unbock" [matTooltipPosition]="'below'">
                //                 <i class="material-icons">account_circle</i>
                //             </button>
                //         </div>`
                //     ]).draw(false);
                // });

                const tableData: string[][] = [];

                this.channelPartners.forEach(user => {
                    const values: string[] = [];
                    values.push('' + (this.channelPartners.indexOf(user) + 1));
                    values.push(user.name);
                    values.push(user.agent_id);
                    values.push('' + user.created_on);
                    values.push('' + user.above25);
                    values.push('' + user.below25);
                    values.push('' + user.code);
                    values.push('' + user.annualUsers);
                    values.push('' + user.termUsers);
                    values.push('' + user.earning);
                    values.push(user.contactNo);
                    tableData.push(values);
                });
                this.dataTable.dataRows = tableData;
                // $('#usersTable').DataTable();

            });
    }

    // setDataTable() {
    //     const tableData: string[][] = [];
    //         this.users.forEach(user => {
    //     const values: string[] = [];
    //     values.push('' + user.id);
    //     values.push(user.name);
    //     values.push(user.email);
    //     values.push(user.agentCode);
    //     values.push('' + user.assetCount);
    //     values.push('' + user.accountCount);
    //     values.push('' + user.dob);
    //     values.push('' + user.createdOn);
    //     values.push(user.plan);
    //     values.push(user.status + '');
    //     tableData.push(values);
    // });
    //     console.log(tableData);

    //     this.dataTable = {
    //         headerRow: ['Id', 'Name', 'Email', 'Channel', 'D1', 'DA', 'YOB', 'Reg Date', 'Plan', 'Actions'],
    //         footerRow: ['Id', 'Name', 'Email', 'Channel', 'D1', 'DA', 'YOB', 'Reg Date', 'Plan', 'Actions'],
    //         dataRows: tableData
    //     };
    //     console.log(this.dataTable);
    //     // this.ngAfterViewInit();
    // }

    ngAfterViewInit() {
        $('#usersTable').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }

        });

        const table = $('#usersTable').DataTable();

        // Block a record
        table.on('click', '.block', function (e: any) {
            const $tr = $(this).closest('tr');
            // table.row($tr).remove().draw();
            // e.preventDefault();
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

    }

    exportToExcel() {
        new Angular2Csv(this.dataTable.dataRows, 'UsersList');
    }

    openUser(data: string[]) {
        console.log('Data' + data);
        var position: number = +data[0];

        const user: ChannelPartner = this.channelPartners[position];
        this.dataService.setChannelPartner(user);
        this.router.navigate(['/channelpartners']);
    }
}
