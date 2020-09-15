import { Component, OnInit } from '@angular/core';

import { EndpointsService } from 'src/app/shared/services/endpoints.service';
import { CoordinatesService } from 'src/app/shared/services/coordinates.service';
import { PlaceService } from 'src/app/shared/services/place.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  coordinates: any;
  place: any;
  forecastWeather: any;
  currentWeather: any;

  constructor(
    private getCoordinates: CoordinatesService,
    private getPlace: PlaceService,
    private endpoints: EndpointsService) {

      this.getCoordinates.sendCoordinates().subscribe(res => {
        this.coordinates = res;
        this.getWeatherByCoordinates('forecast', res.latitude, res.longitude);
        this.getWeatherByCoordinates('current', res.latitude, res.longitude);
      });

      this.getPlace.sendPlace().subscribe(res =>{
        this.place = res;
        this.getWeatherByPlaceName('current', this.place);
        this.getWeatherByPlaceName('forecast', this.place);
      })
  }

  ngOnInit(): void {
    this.getPlace.sendPlace().subscribe(res => {
      this.place = res;
    });
  }

  getWeatherByCoordinates(type: string, lat:number, lon:number){
    if (type == 'current') {
      this.endpoints
      .getCurrentWeatherByCoordinates(lat, lon)
      .subscribe(res =>
        this.currentWeather = res.data[0]);
    } else {
    this.endpoints
    .getForecastWeatherByCoordinates(lat, lon)
    .subscribe(res =>
      this.forecastWeather = res.data);
    }
  }

  getWeatherByPlaceName(type:string, placeName: string){
       if (type == 'current') {
      this.endpoints.getCurrentWeatherByCity(placeName).subscribe(res =>{
        console.log('current by coordinates: ',res);
        
      });
    } else {
      this.endpoints.getForecastWeatherByCity(placeName).subscribe(res =>{
        console.log('forecast by place: ', res);
        
      });
    }
  }

  // getWeather(
  //   type?: string,
  //   lat?: number,
  //   lon?: number,
  //   city?: string){
  //     console.log('eae');
      
  //   if (type == 'current'){
  //     if(city){
  //       this.endpoints.getCurrentWeatherByCity(city).subscribe(res => 
  //         this.currentWeather = res);
  //         return;
  //     } else{
  //     this.endpoints.getCurrentWeatherByCoordinates(lat, lon).subscribe(res =>
  //       this.currentWeather = res);
  //       return;
  //     }
  //   } else{
  //     if(city){
  //       this.endpoints.getForecastWeatherByCity(city).subscribe(res =>
  //         this.forecastWeather = res);
  //         return;
  //     }
  //     console.log('alo alo');      
  //     this.endpoints.getForecastWeatherByCoordinates(lat,lon).subscribe(res =>
  //       this.forecastWeather = res)
  //   }
  // }

  ngOnDestroy(){
    this.coordinates.unsubscribe();
    this.place.unsubscribe();
    this.forecastWeather.unsubscribe();
    this.currentWeather.unsubscribe();
  }

}
