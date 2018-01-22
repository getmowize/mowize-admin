import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from 'app/model/user';
import { ChannelPartner } from '../model/channelpartner';

@Injectable()
export class DataService {

    private user: User;
    private channelPartner: ChannelPartner;

    setUser(currentUser: User) {
        localStorage.setItem('user', currentUser.id + '');
        // this.user = currentUser;
    }

    getUser(): string {
        return localStorage.getItem('user');
        // return this.user;
    }

    setChannelPartner(channelPartner: ChannelPartner){
        this.channelPartner = channelPartner;
    }

    getChannelPartner(): ChannelPartner{
        return this.channelPartner;
    }
}
