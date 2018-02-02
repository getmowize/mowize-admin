import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from 'app/model/user';
import { ChannelPartner } from '../model/channelpartner';
import { Company } from 'app/model/company';

@Injectable()
export class DataService {

    setUser(userId: string) {
        localStorage.setItem('user', userId);
        // this.user = currentUser;
    }

    getUser(): string {
        return localStorage.getItem('user');
    }

    removeUser() {
        localStorage.removeItem('user');
    }

    setChannelPartner(cpId: string) {
        localStorage.setItem('cpId', cpId);
    }

    getChannelPartner(): string {
        return localStorage.getItem('cpId');
    }

    removeChannelPartner() {
        localStorage.removeItem('cpId');
    }

    setEditMode(status: boolean) {
        localStorage.setItem('editCompany', status + '');
    }

    getEditMode(): boolean {
        if (localStorage.getItem('editCompany') === 'true') {
            return true;
        } else {
            return false;
        }
    }

    setCompanyToEdit(company: Company) {
        localStorage.setItem('companyId', company.id + '');
        localStorage.setItem('companyCategoryId', company.categoryId + '');
        localStorage.setItem('companyName', company.name);
        localStorage.setItem('companyType', company.type + '');
    }

    getCompanyToEdit(): Company {
        var company: Company = new Company();
        company.id = +localStorage.getItem('companyId');
        company.categoryId = +localStorage.getItem('companyCategoryId');
        company.type = +localStorage.getItem('companyType');
        company.name = localStorage.getItem('companyName');
        return company;
    }

}
