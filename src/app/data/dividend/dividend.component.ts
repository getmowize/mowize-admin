import { Component, OnInit } from '@angular/core';
import { MowizeService } from '../../services/mowize.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-dividend-component',
    templateUrl: './dividend.component.html'
})
export class DividendComponent implements OnInit {

    dataForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private mowizeService: MowizeService) {
        this.dataForm = this.formBuilder.group({
            csvData: [null, [Validators.required]]
        });
    }

    ngOnInit() {

    }

    saveFile() {

    }
}
