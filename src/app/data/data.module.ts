import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { DividendComponent } from './dividend/dividend.component';
import { FaceValueComponent } from './facevalue/facevalue.component';
import { MutualFundComponent } from './mutualfund/mutualfund.component';
import { StockComponent } from './stocks/stocks.component';
import { DataRoutes } from './data.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DataRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        DividendComponent,
        FaceValueComponent,
        MutualFundComponent,
        StockComponent
    ]
})

export class DataModule {}
