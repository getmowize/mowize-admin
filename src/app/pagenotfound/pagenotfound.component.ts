import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './pagenotfound.component.html',
    styleUrls: ['./pagenotfound.component.css']
})
export class PageNotFoundComponent implements OnInit{

    constructor() { }

    public ngOnInit(): void {
        throw new Error('Not implemented yet.');
    }
}