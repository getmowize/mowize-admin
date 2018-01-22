import { Routes } from '@angular/router';

import { DividendComponent } from './dividend/dividend.component';
import { FaceValueComponent } from './facevalue/facevalue.component';
import { MutualFundComponent } from './mutualfund/mutualfund.component';
import { StockComponent } from './stocks/stocks.component';

export const DataRoutes: Routes = [
    {

        path: '',
        children: [
            {
                path: 'stocks',
                component: StockComponent
            },
            {
                path: 'mutualfunds',
                component: MutualFundComponent
            },
            {
                path: 'dividend',
                component: DividendComponent
            },
            {
                path: 'facevalue',
                component: FaceValueComponent
            },
        ]
    }
];
