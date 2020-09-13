import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class EndpointsService {

    httpParams = new HttpParams()

    constructor(private http: HttpClient){}

    getForecastWeatherByCoordinates(lat, lon){
        return this.http.get(`${environment.local_api}forecast`, {params: this.httpParams.set('lat', lat).set('lon', lon)})
    }

    getCurrentWeatherByCoordinates(lat, lon){
        return this.http.get(`${environment.local_api}current`, {params: this.httpParams.set('lat', lat).set('lon', lon)})
    }
}