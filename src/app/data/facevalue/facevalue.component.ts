import { Component } from '@angular/core';
import { MowizeService } from '../../services/mowize.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $: any;

@Component({
    selector: 'app-facevalue-component',
    templateUrl: './facevalue.component.html'
})
export class FaceValueComponent {

    dataForm: FormGroup;
    file: File;

    selectedFile: string = '';

    constructor(private formBuilder: FormBuilder,
        private mowizeService: MowizeService) {
        this.dataForm = this.formBuilder.group({
            csvData: [null, [Validators.required]]
        });
    }

    ngOnInit() {

    }

    saveFile() {
        if (this.selectedFile === 'dbddiv.csv') {
            console.log(this.file);
            this.mowizeService.uploadDividend(this.file)
                .then(result => {
                    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
                    const color = Math.floor((Math.random() * 6) + 1);
                    if (result === true) {
                        $.notify({
                            icon: 'notifications',
                            message: '<b>Data Uploaded</b>'
                        }, {
                                type: type[color],
                                timer: 1000,
                                placement: {
                                    from: 'bottom',
                                    align: 'right'
                                }
                            }
                        );
                    } else {
                        $.notify({
                            icon: 'notifications',
                            message: '<b>Upload Error</b> - Please try again'
                        }, {
                                type: type[color],
                                timer: 1000,
                                placement: {
                                    from: 'bottom',
                                    align: 'right'
                                }
                            }
                        );
                    }
                });
        } else {
            const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
            const color = Math.floor((Math.random() * 6) + 1);
            $.notify({
                icon: 'notifications',
                message: '<b>File Error</b> - Please try again'
            }, {
                    type: type[color],
                    timer: 1000,
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    }
                }
            );
        }
    }

    onFileChange(event: any) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            this.file = event.target.files[0];
            reader.readAsDataURL(this.file);
            this.selectedFile = this.file.name;
        }
        this.dataForm.get('csvData');
    }
    
}
