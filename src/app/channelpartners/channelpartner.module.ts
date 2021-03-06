import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { ChannelPartnersListComponent } from './channelpartnerlist/channelpartnerslist.component';
import { ChannelPartnerRoutes } from './channelpartner.routing';
import { ChannelPartnerDetailsComponent } from 'app/channelpartners/channelpartnerdetails/channelpartnerdetails.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ChannelPartnerRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        ChannelPartnersListComponent,
        ChannelPartnerDetailsComponent
    ]
})

export class ChannelPartnerModule {}
