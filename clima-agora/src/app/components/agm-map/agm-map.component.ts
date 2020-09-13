import { Subject } from 'rxjs';
import { Component, OnInit, Injectable  } from '@angular/core';

import { CoordinatesModel } from 'src/app/shared/models/coordinates.model';

@Injectable({providedIn:'root'})

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.scss']
})
export class AgmMapComponent implements OnInit {

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  coordinates = new CoordinatesModel();
  zoom: number;

  constructor() {

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.coordinates.latitude = position.coords.latitude;
        this.coordinates.longitude = position.coords.longitude;
        this.zoom = 14;

        this.emitData(this.coordinates);
      });
    }
  }

  ngOnInit() {}

  emitData(data) {
    this.observer.next(data);
  }

  onMapClick(event){
    console.log(event);
    this.coordinates.longitude = event.coords.lng;
    this.coordinates.latitude = event.coords.lat;
    this.emitData(this.coordinates);
  }

}
