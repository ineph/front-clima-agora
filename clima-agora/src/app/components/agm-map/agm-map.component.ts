import { Component, OnInit, Injectable } from '@angular/core';
import { EndpointsService } from 'src/app/shared/services/endpoints.service';
import { CoordinatesModel } from 'src/app/shared/models/coordinates.model';
import { Subject } from 'rxjs';

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

  constructor(private endpoints: EndpointsService) {

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.coordinates.latitude = position.coords.latitude;
        this.coordinates.longitude = position.coords.longitude;
        this.zoom = 30;

        this.emitData(this.coordinates);

      });
    }
  }

  ngOnInit() {
    
  }

  emitData(data) {
    this.observer.next(data);
  }

}
