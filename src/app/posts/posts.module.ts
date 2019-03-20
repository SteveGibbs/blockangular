import {NgModule} from '@angular/core';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostListComponent} from './post-list/post-list.component';
import {AngularMaterialModule} from '../angular-material.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

/**
 * The modules in app.module are not shared so need to
 * be imported separately into the posts.module
 */
@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})

export class PostsModule {

}
