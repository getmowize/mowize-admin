import { Routes } from '@angular/router';

import { ChannelPartnersListComponent } from './channelpartnerlist/channelpartnerslist.component';
import { ChannelPartnerDetailsComponent } from './channelpartnerdetails/channelpartnerdetails.component';

export const ChannelPartnerRoutes: Routes = [
    {
        path: '',
        component: ChannelPartnersListComponent
    }, {
        path: 'details',
        component: ChannelPartnerDetailsComponent
    }
];
