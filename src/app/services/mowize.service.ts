import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

const baseUrl = "http://52.25.112.60/"
const serviceUrl = "Services";

const url = baseUrl + serviceUrl;

@Injectable()
export class MowizeService{
    
    constructor(private http: Http) { }

    private headers = new Headers({
        'Content-Type': 'application/json',
        'Device_Type': '3',
        'App_Version': '25',
        'Api_Version': '1',
        'Decode': '2',
        'Gzip': '2'
    });

    getDataFromWebServer(postData: any): Promise<string> {
        console.log(JSON.stringify(postData));
        return this.http
            .post(url, JSON.stringify(postData), { headers: this.headers })
            .toPromise()
            .then(response => {
                console.log(JSON.stringify(response.json()));
                let jsonData: JSON = response.json();
                if (jsonData["error_code"] === "400") {
                    let message = jsonData["error_desc"];
                } 
                return JSON.stringify(response.json()) as string;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}