import { Component } from '@angular/core';

@Component({
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent {
    copyrightDate: Date = new Date();
    goToMowize(): void {
        window.open('https://www.mowize.com');
    }
}
