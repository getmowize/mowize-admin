import { Component, OnInit } from '@angular/core';
import { MowizeService } from 'app/services/mowize.service';
import { Profession } from 'app/model/profession';
import swal from 'sweetalert2';

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

    constructor(private mowizeService: MowizeService) { }
    professionList: Profession[] = [];

    public dataTable: DataTable;

    ngOnInit(): void {
        this.dataTable = {
            headerRow: ['#', 'Profession', 'Description', 'Action'],
            footerRow: ['#', 'Profession', 'Description', 'Action'],
            dataRows: []
        };

        this.mowizeService.getListOfProfessions()
            .then(profList => {
                this.dataTable.dataRows = [];
                this.professionList = profList;
                this.professionList.forEach(prof => {
                    var row: string[] = [];
                    row.push((this.professionList.indexOf(prof) + 1) + '');
                    row.push(prof.name);
                    row.push(prof.description);
                    row.push(prof.id + '');

                    this.dataTable.dataRows.push(row);

                });

                this.refreshTable();
            });
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

    addProfession() {
        swal({
            title: 'Add Profession',
            html: '<div class="form-group label-floating" style="text-align:left;">' +
                '<label class="control-label">Name</label>' +
                '<input id="name" type="text" class="form-control" value=""/>' +
                '</div>' +
                '<div class="form-group label-floating" style="text-align:left;">' +
                '<label class="control-label">Description</label>' +
                '<input id="description" type="text" class="form-control" value=""/>' +
                '</div>',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(() => {
            var name = $('#name').val();
            var description = $('#description').val();
            this.mowizeService.addProfession(name, description)
                .then(result => {
                    if (result === true) {
                        swal({
                            type: 'success',
                            title: 'Profession Saved',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                        this.mowizeService.getListOfProfessions()
                            .then(profList => {
                                this.dataTable.dataRows = [];
                                this.professionList = profList;
                                this.professionList.forEach(prof => {
                                    var row: string[] = [];
                                    row.push((this.professionList.indexOf(prof) + 1) + '');
                                    row.push(prof.name);
                                    row.push(prof.description);
                                    row.push(prof.id + '');

                                    this.dataTable.dataRows.push(row);

                                });

                                this.refreshTable();
                            });
                        
                    } else {
                        swal({
                            title: 'Unable to save Profession',
                            type: 'error',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        }).catch(swal.noop);
                    }
                });

        }).catch(swal.noop);
    }

    editProfession(name: string, description: string, id: string) {
        swal({
            title: 'Edit Profession',
            html: '<div class="form-group label-floating" style="text-align:left;">' +
                '<label class="control-label">Name</label>' +
                '<input id="input-field" type="text" class="form-control" value="' + name + '"/>' +
                '</div>' +
                '<div class="form-group label-floating" style="text-align:left;">' +
                '<label class="control-label">Description</label>' +
                '<input id="input-field" type="text" class="form-control" value="' + description + '"/>' +
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
                        // var row = this.dataTable.dataRows[position - 1];
                        // console.log(row);
                        // row[1] = input;
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
