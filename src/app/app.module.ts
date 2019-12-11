import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CitiesComponent } from './cities/cities.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {ReactiveFormsModule} from '@angular/forms';
import { CitySearchComponent } from './shared/components/city-search-component/city-search/city-search.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxLoadingModule} from 'ngx-loading';
import { CitySearchService } from './shared/services/city-search.service';
import { UserInformationService } from './shared/services/user.information.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SignupComponent,
    LoginComponent,
    CitiesComponent,
    CitySearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    CitySearchService,
    UserInformationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
