import {Component, NgModule} from '@angular/core';
import {AngularMaterialModule} from '../angular-material.module';



@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

@NgModule ({
  imports: [
    AngularMaterialModule
    ]
})

export class AboutComponent {
}
