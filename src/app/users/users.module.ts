import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { UsersComponent } from './list/users.component';
import { UsersRoutes } from './users.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UsersRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [UsersComponent]
})

export class UsersModule {}
