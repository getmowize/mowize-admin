import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { UsersComponent } from './list/users.component';
import { UserDetailComponent } from './details/userdetails.component';
import { UsersRoutes } from './users.routing';
import { FieldErrorDisplayModule } from 'app/field-error-display/field-error-display.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UsersRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        FieldErrorDisplayModule
    ],
    declarations: [
        UsersComponent,
        UserDetailComponent
    ]
})

export class UsersModule {}
