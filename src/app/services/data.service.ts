import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from 'app/model/user';
import { ChannelPartner } from '../model/channelpartner';

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
}
