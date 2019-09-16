import { Component, OnInit } from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

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
  title = 'Forest Fitness';
  lat = 59.318297;
  lng = 17.953010;
  zoom = 15;

  chooseMarker(event){
  console.log(event);
  }
  constructor() { }

  ngOnInit() {
  }

}


