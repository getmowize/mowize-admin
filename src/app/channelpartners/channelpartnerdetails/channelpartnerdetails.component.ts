import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';

import { ChannelPartner } from '../../model/channelpartner';
import { MowizeService } from '../../services/mowize.service';

@Component({
    selector: 'app-channel-partner-details-list',
    templateUrl: './channelpartnerdetails.component.html'
})
export class ChannelPartnerDetailsComponent implements OnInit {

    channelPartner: ChannelPartner;
    public inEditMode: boolean = false;

    constructor(private dataService: DataService, private mowizeService: MowizeService) { }

    ngOnInit() {
        var id = this.dataService.getChannelPartner();
        console.log(id);
        this.mowizeService.getChannelPartnerDetails(id)
            .then(channelPartner => {
                this.channelPartner = channelPartner;
            });
    }

    setEditMode() {
        this.inEditMode = true;
    }

    setViewMode() {
        this.inEditMode = false;
    }

}

