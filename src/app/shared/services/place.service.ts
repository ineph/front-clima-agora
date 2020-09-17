import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PlaceService {

    public place = new Subject<string>();

    setPlace(place: string){
        this.place.next(place);
    }

    sendPlace(): Observable<string>{
        return this.place.asObservable();
    }
}