import { Component, OnInit } from '@angular/core';

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
        this.getWeather('forecast', res.latitude, res.longitude);
        this.getWeather('current', res.latitude, res.longitude);
      });

  }

  ngOnInit(): void {}

  getWeather(type:string, lat:number, lon:number){

    if (type == 'current'){
      this.endpoints
      .getCurrentWeatherByCoordinates(lat,lon)
      .subscribe(res => {
        this.currentWeather = res.data[0];
      });
    }else{
      this.endpoints
      .getForecastWeatherByCoordinates(lat,lon)
      .subscribe(res => {
        this.forecastWeather = res.data;
      });
    }
  }

}
