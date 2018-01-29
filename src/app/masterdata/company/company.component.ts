import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-company-component',
    templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

    public dataTable: DataTable;

    ngOnInit(): void {
        this.dataTable = {
            headerRow: ['#', 'Company/Bank', 'Category', 'Action'],
            footerRow: ['#', 'Company/Bank', 'Category', 'Action'],
            dataRows: []
        };
    }

    refreshTable() {
        const table = $('#professionTable').DataTable();
        table.destroy();

        var self = this;
        setTimeout(function () {
            self.makeDataTable();
        }, 10);
    }

    makeDataTable() {
        $('#professionTable').DataTable({
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

}
