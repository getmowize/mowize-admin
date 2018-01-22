import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { EmailsComponent } from './emails/emails.component';
import { EmailsRoutes } from './emailer.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(EmailsRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
    ],
    declarations: [
        EmailsComponent
    ]
})
export class EmailerModule {

}
