import { Component, OnInit } from '@angular/core';
import { AgmMapComponent } from '../agm-map/agm-map.component';
import { EndpointsService } from 'src/app/shared/services/endpoints.service';

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

      this.mapCoordinates.subscriber$.subscribe(data => {
        this.coordinates = data;
        this.forecast(this.coordinates.latitude,this.coordinates.longitude)
      });

  }

  ngOnInit(): void {}

  forecast(lat, lon){
      this.endpoints
      .getForecastWeatherByCoordinates(lat,lon)
      .subscribe(res => {
        console.log(this.waeather = res);
      });
  }

}
