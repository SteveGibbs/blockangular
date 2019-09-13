import { Component, OnInit } from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GoogleMapsAPIWrapper
} from '@agm/core';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

@NgModule ({
  imports: [
    BrowserModule
    ]
})
export class MapComponent implements OnInit {
  title = 'Forest Fitness Locations';
  lat = 51.678418;
  lng = 7.809007;
  constructor() { }

  ngOnInit() {
  }

}


