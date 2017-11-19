import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginBusyComponent } from "./login/login-busy/login-busy.component";
import { LoginErrorComponent } from "./login/login-error/login-error.component";
import { LoginDoneComponent } from "./login/login-done/login-done.component";
import { LogoutComponent } from "./login/logout/logout.component";
import { CanActivateService } from './services/can.activate.service'

import { PatientListComponent } from "./party/patient/patient-list/patient-list.component";
import { PatientDetailComponent } from "./party/patient/patient-detail/patient-detail.component";
import { CoolChartComponent } from "./cool-chart/cool-chart.component";


export class RouterConfig {
    static appRoutes: Routes = [
        { path: 'patienten/overzicht', component: PatientListComponent, canActivate: [CanActivateService]  },
        { path: 'patient/:id', component: PatientDetailComponent, canActivate: [CanActivateService]  },
        { path: 'chart', component: CoolChartComponent , canActivate: [CanActivateService]  },
        { path: 'home', component: HomeComponent },
        { path: 'login', component: LoginBusyComponent   },
        { path: 'logindone', component: LoginDoneComponent },
        { path: 'loginerror', component: LoginErrorComponent },
        { path: 'logout', component: LogoutComponent },
        { path: '**', component: HomeComponent },
        { path: '', redirectTo: 'patienten/overzicht', pathMatch: 'full' },
      ];
      
}
