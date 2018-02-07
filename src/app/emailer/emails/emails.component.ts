import { Component, OnInit } from '@angular/core';
import { MowizeService } from '../../services/mowize.service';
import { Router } from '@angular/router';
import { DataService } from 'app/services/data.service';
import { EmailTemplate } from 'app/model/emailtemplate';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-emails',
    templateUrl: './emails.component.html',
    styleUrls: ['./emails.component.css']

})
export class EmailsComponent implements OnInit{

    public dataTable: DataTable;
    public emailTemplates: EmailTemplate[] = [];

    constructor(private mowizeService: MowizeService,
        private dataService: DataService,
        private router: Router
    ) {
        this.dataService.removeEmailTemplate();
    }

    ngOnInit() {
        this.dataTable = {
            headerRow: ['#', 'Subject', 'Body', 'Action'],
            footerRow: ['#', 'Subject', 'Body', 'Action'],
            dataRows: []
        };

        this.getEmails();
    }

    getEmails() {
        this.mowizeService.getEmailTemplates()
            .then(result => {
                this.emailTemplates = result;
                this.dataTable.dataRows = [];
                this.emailTemplates.forEach(template => {
                    var row: string[] = [];
                    row.push((this.emailTemplates.indexOf(template) + 1) + '');
                    row.push(template.subject);
                    row.push(template.body);
                    this.dataTable.dataRows.push(row);
                });

                this.refreshTable();
            });
    }

    refreshTable() {
        const table = $('#emailsTable').DataTable();
        table.destroy();

        var self = this;
        setTimeout(function () {
            self.makeDataTable();
        }, 10);
    }

    makeDataTable() {
        $('#emailsTable').DataTable({
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

        const table = $('#emailsTable').DataTable();
    }

    openEmail(position: number) {
        console.log(this.emailTemplates);
        console.log(position);
        console.log(this.emailTemplates[position]);
        this.dataService.setEmailTemplate(this.emailTemplates[position-1]);
        this.router.navigate(['/emails/details']);
    }

}
