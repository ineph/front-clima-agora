import { Component, OnInit } from '@angular/core';
import { AgmMapComponent } from '../agm-map/agm-map.component';
import { EndpointsService } from 'src/app/shared/services/endpoints.service';
import { CoordinatesService } from 'src/app/shared/services/coordinates.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  coordinates: any;
  forecastWeather: any;
  currentWeather: any;

  constructor(
    private getCoordinates: CoordinatesService,
    private endpoints: EndpointsService) {

      this.getCoordinates.sendCoordinates().subscribe(res => {
        this.coordinates = res;
        this.forecast(res.latitude, res.longitude);
        this.current(res.latitude, res.longitude);
      });

  }

  ngOnInit(): void {}

  forecast(lat, lon){
      this.endpoints
      .getForecastWeatherByCoordinates(lat,lon)
      .subscribe(res => {
        console.log('forecast: ',this.forecastWeather = res);
      });
  }

  current(lat,lon){
    this.endpoints
    .getCurrentWeatherByCoordinates(lat,lon)
    .subscribe(res => {
      console.log('current: ', this.currentWeather = res)
    });
  }

}
