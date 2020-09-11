import { Component, OnInit } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core'; 

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.scss']
})
export class AgmMapComponent implements OnInit {

  constructor(private apiloader: MapsAPILoader) { }

  ngOnInit(): void {
  }

}
