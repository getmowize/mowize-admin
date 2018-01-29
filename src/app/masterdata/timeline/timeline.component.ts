import { Component, OnInit } from '@angular/core';
import { MowizeService } from 'app/services/mowize.service';
import { DocumentTimeline } from 'app/model/documentTimeline';
import swal from 'sweetalert2';

declare const $: any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-timeline-component',
    templateUrl: './timeline.component.html'
})

export class TimelineComponent implements OnInit {

    public dataTable: DataTable;
    private timelineList: DocumentTimeline[] = [];

    constructor(private mowizeService: MowizeService) { }

    ngOnInit(): void {

        this.dataTable = {
            headerRow: ['#', 'Title', 'Action'],
            footerRow: ['#', 'Title', 'Action'],
            dataRows: []
        };

        this.timelineList = [];
        this.dataTable.dataRows = [];
        this.mowizeService.getListOfTimeline()
            .then(timelineList => {
                this.timelineList = timelineList;
                console.log(timelineList);
                this.timelineList.forEach(timeline => {
                    var row: string[] = [];
                    row.push((this.timelineList.indexOf(timeline) + 1) + '');
                    row.push(timeline.title);
                    row.push(timeline.id + '');

                    this.dataTable.dataRows.push(row);
                });
                this.refreshTable();
            });
    }

    refreshTable() {
        const table = $('#timelineTable').DataTable();
        table.destroy();

        var self = this;
        setTimeout(function () {
            self.makeDataTable();
        }, 10);
    }

    makeDataTable() {
        $('#timelineTable').DataTable({
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

    editTimeline(id: string, title: string, position: number) {
        swal({
            title: 'Edit Timeline',
            html: '<div class="form-group label-floating" style="text-align:left;">' +
                '<label class="control-label">New Entry</label>' +
                '<input id="input-field" type="text" class="form-control" value="' + title + '"/>' +
                '</div>',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(() => {
            var input = $('#input-field').val();
            this.mowizeService.editTimeline(id, input)
                .then(result => {
                    if (result === true) {
                        swal({
                            type: 'success',
                            title: 'Timeline Saved',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                        var row = this.dataTable.dataRows[position - 1];
                        console.log(row);
                        row[1] = input;
                        this.refreshTable();
                        console.log(this.dataTable);
                    } else {
                        swal({
                            title: 'Unable to save Timeline',
                            type: 'error',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                    }
                });

        }).catch(swal.noop);
    }

}
