import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { RecordComponent } from './records/record.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfessionComponent } from './professions/profession.component';
import { CompanyComponent } from './company/company.component';

export const MasterDataRoutes: Routes = [
    {

        path: '',
        children: [
            {
                path: 'category',
                component: CategoryComponent
            }, {
                path: 'records',
                component: RecordComponent
            }, {
                path: 'timeline',
                component: TimelineComponent
            }, {
                path: 'professions',
                component: ProfessionComponent
            }, {
                path: 'company',
                component: CompanyComponent
            }
        ]
    }
];
