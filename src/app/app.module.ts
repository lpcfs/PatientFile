import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; // firebase hashtag navigation
import { CanActivateService } from './services/can.activate.service'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// flex-layout : https://github.com/angular/flex-layout/wiki/Using-Angular-CLI
import { FlexLayoutModule } from '@angular/flex-layout';

// Firebase
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatExpansionModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, MatDialogModule } from '@angular/material';
import { MatIconModule, MatCardModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import {MatTabsModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material';

import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './login/logout/logout.component';
import { LoginBusyComponent } from './login/login-busy/login-busy.component';
import { LoadingSpinComponent } from './ui/loading-spin/loading-spin.component';
import { LoginErrorComponent } from './login/login-error/login-error.component';
import { LoginDoneComponent } from './login/login-done/login-done.component';

import { RouterConfig } from './router-config';
import { PatientListComponent } from './party/patient/patient-list/patient-list.component';
import { PatientDetailComponent } from './party/patient/patient-detail/patient-detail.component';
import { CoolChartComponent } from './cool-chart/cool-chart.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {MatInputModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PartyGeneralComponent } from './party/uc/party-general/party-general.component';
import { PartyCommunicationComponent } from './party/uc/party-communication/party-communication.component';

import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { TextMaskModule } from 'angular2-text-mask';
import { MenuService } from './services/menu.service';



@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    HomeComponent,
    LogoutComponent,
    LoginBusyComponent,
    LoadingSpinComponent,
    LoginErrorComponent,
    LoginDoneComponent,
    PatientDetailComponent,
    CoolChartComponent,
    PartyGeneralComponent,
    PartyCommunicationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/auth, only needed for auth features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    RouterModule.forRoot(
      RouterConfig.appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),

    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule ,
    
    FlexLayoutModule,

    DynamicFormsCoreModule.forRoot(), 
    DynamicFormsMaterialUIModule,
    TextMaskModule
  ],
  providers: [
    AuthService, 
    CanActivateService, 
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MenuService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
