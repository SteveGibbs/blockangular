import {NgModule} from '@angular/core';
import {UserProfileComponent} from './user-profile-create/user-profile.component';
import {AngularMaterialModule} from '../angular-material.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UserProfileListComponent} from './user-profile-list/user-profile-list.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileListComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})

export class UserModule {

}
