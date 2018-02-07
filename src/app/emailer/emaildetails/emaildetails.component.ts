import { Component, OnInit } from '@angular/core';
import { MowizeService } from '../../services/mowize.service';
import { DataService } from 'app/services/data.service';
import { EmailTemplate } from 'app/model/emailtemplate';

@Component({
    selector: 'app-email-details',
    templateUrl: './emaildetails.component.html'

})
export class EmailDetailsComponent implements OnInit {

    email: EmailTemplate;

    constructor(private mowizeService: MowizeService,
        private dataService: DataService,
    ) {
        this.email = this.dataService.getEmailTemplate();
    }

    ngOnInit(): void {

    }

}
