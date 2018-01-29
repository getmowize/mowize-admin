import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MowizeService } from 'app/services/mowize.service';
import { CategoryData } from 'app/model/categoryData';

@Component({
    selector: 'app-record-component',
    templateUrl: './record.component.html'
})
export class RecordComponent implements OnInit {

    private categoryList: CategoryData[] = [];
    private totalValue: number = 0;

    fromDate: Date;
    toDate: Date;

    maxDate = new Date();

    constructor(private mowizeService: MowizeService,
        public datepipe: DatePipe) { }

    ngOnInit(): void {
        this.categoryList = [];
        this.totalValue = 0;
        this.mowizeService.getRecordsData('', '').then(categoryList => {
            this.categoryList = categoryList;
            this.categoryList.forEach(category => {
                this.totalValue = this.totalValue + category.totalValue;
            });
        });
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
        this.categoryList = [];
        this.totalValue = 0;
        this.mowizeService.getRecordsData(from, to)
            .then(categoryList => {
                this.categoryList = categoryList;
                this.categoryList.forEach(category => {
                    this.totalValue = this.totalValue + category.totalValue;
                });
            });
    }

}
