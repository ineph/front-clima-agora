import { HttpClient, HttpParams } from '@angular/common/http';
import { InjectSetupWrapper } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class EndpointsService {

    httpParams = new HttpParams()

    constructor(private http: HttpClient){}

    getWeatherByCoordinates(lat, lon){
        return this.http.get(`${environment.local_api}`, {params: this.httpParams.set('lat', lat).set('lon', lon)})
    }
}