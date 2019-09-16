import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {AboutComponent} from './content/about.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {PricingComponent} from './content/pricing.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import {ErrorInterceptor} from './error-interceptor';
import {ErrorComponent} from './error/error.component';
import {AngularMaterialModule} from './angular-material.module';
import {PostsModule} from './posts/posts.module';
import {UserModule} from './user/user.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {NgxPageScrollCoreModule} from 'ngx-page-scroll-core';
// import {ParallaxDirective} from './parallax.directive';
import {DirectivesModule} from './directives.module';
import { MapComponent } from './map/map.component';
import {AgmCoreModule} from '@agm/core';
import {FooterComponent} from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PricingComponent,
    AboutComponent,
    ErrorComponent,
    PageNotFoundComponent,
    MapComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    UserModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    DirectivesModule,
    AgmCoreModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }


