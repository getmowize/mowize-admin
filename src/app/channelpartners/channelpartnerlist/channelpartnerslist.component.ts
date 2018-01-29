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
    templateUrl: './channelpartnerslist.component.html'
})
export class ChannelPartnersListComponent implements OnInit, AfterViewInit {

    public dataTable: DataTable;
    channelPartners: ChannelPartner[] = [];

    constructor(private mowizeService: MowizeService,
        private dataService: DataService,
        private router: Router
    ) {
        this.dataService.removeChannelPartner();
     }

    ngOnInit() {
        this.dataTable = {
            headerRow: ['#', 'Name', 'AgentId', 'Creation Date', '+25', '-25', 'Code', 'Annual', '5 year', 'Earnings', 'Contact No', 'Actions'],
            footerRow: ['#', 'Name', 'AgentId', 'Creation Date', '+25', '-25', 'Code', 'Annual', '5 year', 'Earnings', 'Contact No', 'Actions'],
            dataRows: []
        };
        this.mowizeService.getListOfChannelPartners()
            .then(result => {
                console.log(result);
                this.channelPartners = result;
                this.dataTable.dataRows = [];
                this.channelPartners.forEach(user => {
                    const values: string[] = [];
                    values.push('' + user.id);
                    values.push('' + (this.channelPartners.indexOf(user) + 1));
                    values.push(user.name);
                    values.push(user.agent_id);
                    values.push('' + user.createdOn);
                    values.push('' + user.above25);
                    values.push('' + user.below25);
                    values.push('' + user.code);
                    values.push('' + user.annualUsers);
                    values.push('' + user.termUsers);
                    values.push('' + user.earning);
                    values.push(user.phone);
                    this.dataTable.dataRows.push(values);
                });

                this.refreshTable();

            });
    }

    refreshTable() {
        const table = $('#usersTable').DataTable();
        table.destroy();

        var self = this;
        setTimeout(function () {
            self.makeDataTable();
        }, 10);
    }

    makeDataTable() {
        $('#usersTable').DataTable({
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
    }

    ngAfterViewInit() {
        //dont initialize

    }

    exportToExcel() {
        new Angular2Csv(this.dataTable.dataRows, 'UsersList');
    }

    openPartner(id: string, position: number) {
        this.dataService.setChannelPartner(id);
        this.router.navigate(['/channelpartners/details']);
    }

    editPartner(id: string, position: number) {

    }

    deletePartner(id: string, position: number, userName: string) {
        swal({
            title: 'Are you sure you want to delete ' + userName + ' ?',
            text: 'This only deletes user, his promocodes deactivates for further users but current users code will work',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(() => {
            this.mowizeService.deleteChannelPartner(id)
                .then(result => {
                    if (result === true) {
                        swal({
                            title: 'Deleted!',
                            text: userName + ' has been deleted',
                            type: 'success',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                        const table = $('#usersTable').DataTable();
                        table.row(position-1).remove();
                        this.refreshTable();
                    } else {
                        swal({
                            title: 'Unable to delete channel partner!',
                            text: userName + ' was not deleted',
                            type: 'error',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                    }
                });
        }).catch(swal.noop);
    }

    sendPartnerCode(id: string, position: number) {
        swal({
            title: 'Resend channel partner codes?',
            text: 'This will send sms/email about the channel partner data to channel partner',
            type: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(() => {
            this.mowizeService.resendChannelPartnerCode(id)
                .then(result => {
                    if (result === true) {
                        swal({
                            title: 'Sent!',
                            text: 'Codes have been resent',
                            type: 'success',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                        
                    } else {
                        swal({
                            title: 'Not sent!',
                            text: 'Unable to send codes at this time',
                            type: 'error',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                    }
                });
        }).catch(swal.noop);
    }
}
