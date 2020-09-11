import { HttpClient } from '@angular/common/http';
import { InjectSetupWrapper } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class EndpointsService {
    constructor(private http: HttpClient){}

    getTest(){
        return this.http.get(environment.local_api)
    }
}