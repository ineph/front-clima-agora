import { Component, OnInit, Injectable, NgZone, ViewChild, ElementRef  } from '@angular/core';

import { CoordinatesService } from 'src/app/shared/services/coordinates.service';
import { CoordinatesModel } from 'src/app/shared/models/coordinates.model';
import { MapsAPILoader } from '@agm/core';

@Injectable({providedIn:'root'})

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.scss']
})
export class AgmMapComponent implements OnInit {

  coordinates = new CoordinatesModel();
  zoom: number;
  geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef

  constructor(
    private setCoordinates: CoordinatesService,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader
    ) {}

  ngOnInit() {

    this.mapsAPILoader.load().then(() => {
      this.getLocation();

      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.coordinates.latitude = place.geometry.location.lat();
          this.coordinates.longitude = place.geometry.location.lng();
          this.setCoordinates.setCoordinates(this.coordinates);
        });
      });
    });

  }

  onMapClick(event){
    this.coordinates.longitude = event.coords.lng;
    this.coordinates.latitude = event.coords.lat;
    this.setCoordinates.setCoordinates(this.coordinates);
  }

  getLocation(){
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.coordinates.latitude = position.coords.latitude;
        this.coordinates.longitude = position.coords.longitude;
        
        this.setCoordinates.setCoordinates(this.coordinates);
        this.zoom = 14;
      });
    }
  }

}
