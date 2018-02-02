import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MowizeService } from '../../services/mowize.service';
import { Company } from 'app/model/company';
import { DataService } from 'app/services/data.service';

declare const $: any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-companydetail-component',
    templateUrl: './companydetails.component.html'
})
export class CompanyDetailsComponent implements OnInit {

    public dataTable: DataTable;
    company: Company;
    companyName: string;
    companyType: string;
    selectedCompanies: string[] = [];

    constructor(private mowizeService: MowizeService,
        private router: Router,
        private dataService: DataService
    ) {
        if (this.dataService.getEditMode()) {
            this.company = this.dataService.getCompanyToEdit();
            this.mowizeService.getCompanyDetails(this.company.id).then(result => {
                this.selectedCompanies = result;
                this.companyName = this.company.name;
                this.companyType = this.company.type + '';

            });
        } else {
            this.company = new Company();
        }
    }

    ngOnInit(): void {

    }

    save() {
        if (this.dataService.getEditMode()) {
            this.mowizeService.editCompany(this.company.id, this.companyName, +this.companyType, this.selectedCompanies)
                .then(result => {
                    if (result) {
                        this.router.navigate(['/masterdata/company']);
                    } else {
                        const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
                        const color = Math.floor((Math.random() * 6) + 1);
                        $.notify({
                            icon: 'notifications',
                            message: '<b>Cant Edit Company</b> - Please try again'
                        }, {
                                type: type[color],
                                timer: 1000,
                                placement: {
                                    from: 'bottom',
                                    align: 'right'
                                }
                            }
                        );
                    }
                });
        } else {
            this.company = new Company();
            this.mowizeService.addCompany(this.company.id, this.companyName, +this.companyType, this.selectedCompanies)
                .then(result => {
                    if (result) {
                        this.router.navigate(['/masterdata/company']);
                    } else {
                        const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
                        const color = Math.floor((Math.random() * 6) + 1);
                        $.notify({
                            icon: 'notifications',
                            message: '<b>Cant Add Company</b> - Please try again'
                        }, {
                                type: type[color],
                                timer: 1000,
                                placement: {
                                    from: 'bottom',
                                    align: 'right'
                                }
                            }
                        );
                    }
                });
        }
    }

}
