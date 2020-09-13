import { Subject } from 'rxjs';
import { Component, OnInit, Injectable  } from '@angular/core';

import { CoordinatesModel } from 'src/app/shared/models/coordinates.model';
import { HomeComponent } from '../home/home.component';
import { CoordinatesService } from 'src/app/shared/services/coordinates.service';

@Injectable({providedIn:'root'})

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.scss']
})
export class AgmMapComponent implements OnInit {

  coordinates = new CoordinatesModel();
  zoom: number;

  constructor(private setCoordinates: CoordinatesService) {

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.coordinates.latitude = position.coords.latitude;
        this.coordinates.longitude = position.coords.longitude;
        this.zoom = 14;

        this.setCoordinates.setCoordinates(this.coordinates);
      });
    }
  }

  ngOnInit() {}

  onMapClick(event){
    console.log('evento: ', event);
    this.coordinates.longitude = event.coords.lng;
    this.coordinates.latitude = event.coords.lat;
    this.setCoordinates.setCoordinates(this.coordinates);
  }

}
