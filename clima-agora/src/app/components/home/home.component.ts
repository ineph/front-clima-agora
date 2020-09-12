import { Component, OnInit, Input } from '@angular/core';
import { AgmMapComponent } from '../agm-map/agm-map.component';
import { EndpointsService } from 'src/app/shared/services/endpoints.service';
import { CoordinatesModel } from 'src/app/shared/models/coordinates.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  coordinates: any;
  waeather: any;

  constructor(
    private mapCoordinates: AgmMapComponent,
    private endpoints: EndpointsService) {

  }

  ngOnInit(): void {
    this.mapCoordinates.subscriber$.subscribe(data => {
      this.coordinates = data;
      this.endpoints.getWeatherByCoordinates(this.coordinates.latitude, this.coordinates.longitude)
      .subscribe(res => {
        console.log(this.waeather = res);
      })

    });
  }

}
