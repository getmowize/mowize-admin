import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MowizeService } from '../../services/mowize.service';
import { Company } from 'app/model/company';
import { DataService } from 'app/services/data.service';

import swal from 'sweetalert2';

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
    companyList: Company[];

    constructor(private mowizeService: MowizeService,
        private dataService: DataService,
        private router: Router
    ) { 
        this.dataService.setEditMode(false);
    }

    ngOnInit(): void {
        this.dataTable = {
            headerRow: ['#', 'Company/Bank', 'Category', 'Type', 'Action'],
            footerRow: ['#', 'Company/Bank', 'Category', 'Type', 'Action'],
            dataRows: []
        };

        this.mowizeService.getCompanies()
            .then(companyList => {
                this.companyList = companyList;
                this.dataTable.dataRows = [];
                this.companyList.forEach(company => {
                    var row: string[] = [];

                    row.push((this.companyList.indexOf(company) + 1) + ''); //0 for index
                    row.push(company.name);    //1 for name
                    row.push(this.getCategoryName(company.categoryId)); //2 for category name
                    row.push(this.getCompanyType(company.type)); //3 for company type name
                    row.push(company.id + '');
                    row.push(company.categoryId + '');
                    row.push(company.type + '');

                    this.dataTable.dataRows.push(row);
                });
                this.refreshTable();
            });
    }

    refreshTable() {
        const table = $('#companyTable').DataTable();
        table.destroy();

        var self = this;
        setTimeout(function () {
            self.makeDataTable();
        }, 10);
    }

    makeDataTable() {
        $('#companyTable').DataTable({
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

        const table = $('#companyTable').DataTable();
    }

    getCategoryName(id: number): string {
        if (id === 5) {
            return 'Vehicle Insurance';
        } else if (id === 6) {
            return 'Term Insurance';
        } else if (id === 7) {
            return 'Health Insurance';
        } else if (id === 8) {
            return 'Property Insurance';
        } else if (id === 9) {
            return 'Other Insurance';
        } else if (id === 10) {
            return 'Credit Card';
        } else if (id === 11) {
            return 'Gift Card';
        } else if (id === 12) {
            return 'Loyalty Card';
        } else if (id === 13) {
            return 'Health Card';
        } else if (id === 14) {
            return 'Wallet';
        } else if (id === 15) {
            return 'Account';
        } else if (id === 17) {
            return 'Mutual Fund SIP';
        } else if (id === 18) {
            return 'Mutual Fund';
        } else if (id === 19) {
            return 'Listed Stock';
        } else if (id === 20) {
            return 'Unlisted Stock';
        } else if (id === 22) {
            return 'Jewellery';
        } else if (id === 35) {
            return 'Self Occupied';
        } else if (id === 36) {
            return 'Rent Generating';
        } else if (id === 37) {
            return 'Under Construction Property';
        } else if (id === 23) {
            return 'Home Loan';
        } else if (id === 24) {
            return 'Car Loan';
        } else if (id === 25) {
            return 'Education Loan';
        } else if (id === 26) {
            return 'Property Loan';
        } else if (id === 27) {
            return 'Security Loan';
        } else if (id === 28) {
            return 'Other Loan';
        } else if (id === 38) {
            return 'Under Construction Loan';
        } else if (id === 39) {
            return 'Personal Loan';
        } else if (id === 29) {
            return 'PPF';
        } else if (id === 30) {
            return 'Money Back Policy';
        } else if (id === 31) {
            return 'PF';
        } else if (id === 32) {
            return 'Bonds';
        } else if (id === 33) {
            return 'FD';
        } else if (id === 34) {
            return 'RD';
        } else if (id === 40) {
            return 'Other Investment';
        } else if (id === 0) {
            return 'Account';
        }
    }

    getCompanyType(id: number): string {
        if (id === 1) {
            return 'Company';
        } else if (id === 2) {
            return 'Bank';
        }
    }

    addNewCompany() {
        this.dataService.setEditMode(false);
        this.router.navigate(['/masterdata/companydetails']);
    }

    editCompany(position: number) {
        this.dataService.setEditMode(true);
        const company = this.companyList[position];
        this.dataService.setCompanyToEdit(company);
        this.router.navigate(['/masterdata/companydetails']);
    }

}
