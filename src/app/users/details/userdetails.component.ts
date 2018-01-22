import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Input } from '@angular/core/src/metadata/directives';
import { User } from 'app/model/user';
import { DataService } from 'app/services/data.service';
import { MowizeService } from 'app/services/mowize.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-details',
    templateUrl: './userdetails.component.html',
    styleUrls: ['./userdetails.component.css']
})
export class UserDetailComponent implements OnInit {

    // @Input() user: User;
    private user: User;
    constructor(private dataService: DataService, private mowizeService: MowizeService, private router: Router) { }

    ngOnInit(): void {

        var id = this.dataService.getUser();
        console.log(id);
        this.mowizeService.getUserDetails(id)
            .then(user => {
                this.user = user;
                console.log(this.user);
            });

    }

    getGender(genderCode: string): string {
        if (genderCode === 'M') {
            return 'Male';
        } else if (genderCode === 'F') {
            return 'Female';
        } else {
            return '';
        }
    }

    getProfession(professionCode: number): string {
        if (professionCode === 1) {
            return 'Architect';
        } else if (professionCode === 2) {
            return 'Business Consultant';
        } else if (professionCode === 3) {
            return 'Chairman/Owner/CEO/Partner';
        } else if (professionCode === 4) {
            return 'Creative Consultants';
        } else if (professionCode === 5) {
            return 'Educator';
        } else if (professionCode === 6) {
            return 'Engineer';
        } else if (professionCode === 7) {
            return 'Financial Analyst';
        } else if (professionCode === 8) {
            return 'Human Resources';
        } else if (professionCode === 9) {
            return 'IT Services';
        } else if (professionCode === 10) {
            return 'Legal Occupations';
        } else if (professionCode === 11) {
            return 'Operations';
        } else if (professionCode === 12) {
            return 'Purchase Management';
        } else if (professionCode === 13) {
            return 'Sales';
        } else if (professionCode === 14) {
            return 'Social Services';
        } else if (professionCode === 15) {
            return 'Student';
        } else if (professionCode === 16) {
            return 'Other';
        } else {
            return 'N/A';
        }
    }

    getSalary(salaryCode: number): string {
        if (salaryCode === 1) {
            return '0-2 lacs';
        } else if (salaryCode === 2) {
            return '2-5 lacs';
        } else if (salaryCode === 3) {
            return '5-10 lacs';
        } else if (salaryCode === 4) {
            return '10-15 lacs';
        } else if (salaryCode === 5) {
            return '15-20 lacs';
        } else if (salaryCode === 6) {
            return '20 lacs onwards';
        } else {
            return 'N/A';
        }
    }

    getDeviceId(deviceId: number) {
        if (deviceId === 1) {
            return 'Android';
        } else if (deviceId === 2) {
            return 'iOS';
        } else if (deviceId === 3) {
            return 'Web';
        } else {
            return 'N/A';
        }
    }

}
