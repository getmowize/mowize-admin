import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import { MasterDataRoutes } from './masterdata.routing';
import { CategoryComponent } from './category/category.component';
import { RecordComponent } from './records/record.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfessionComponent } from './professions/profession.component';
import { CompanyComponent } from './company/company.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MasterDataRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        CategoryComponent,
        RecordComponent,
        TimelineComponent,
        ProfessionComponent,
        CompanyComponent
    ]
})

export class MasterDataModule {}
