import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorDisplayComponent } from "app/field-error-display/field-error-display.component";

@NgModule({
    imports: [CommonModule],
    declarations: [
        FieldErrorDisplayComponent
    ],
    exports: [
        FieldErrorDisplayComponent
    ]
})

export class FieldErrorDisplayModule { }
