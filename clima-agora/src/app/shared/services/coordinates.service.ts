import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CoordinatesModel } from '../models/coordinates.model';

@Injectable({providedIn: 'root'})
export class CoordinatesService {

    public coordinates = new Subject<CoordinatesModel>();

    setCoordinates(coords: CoordinatesModel){
        this.coordinates.next(coords)
        console.log(coords);
    }

    sendCoordinates(): Observable<CoordinatesModel>{
        return this.coordinates.asObservable();
    }
}