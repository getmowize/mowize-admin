import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}


@Component({
    selector: 'app-profession-component',
    templateUrl: './profession.component.html'
})
export class ProfessionComponent implements OnInit {

    public dataTable: DataTable;

    ngOnInit(): void {
        this.dataTable = {
            headerRow: ['#', 'Profession', 'Category', 'Action'],
            footerRow: ['#', 'Profession', 'Category', 'Action'],
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
