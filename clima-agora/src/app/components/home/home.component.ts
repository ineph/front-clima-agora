import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/shared/services/endpoints.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  test = {};
  
  constructor(private endpoints: EndpointsService) {
    this.endpoints.getTest().subscribe(res => {console.log(this.test = res)})
  }
  
  ngOnInit(): void {
  }
  
}
