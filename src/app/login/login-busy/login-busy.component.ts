import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-busy',
  templateUrl: './login-busy.component.html',
  styleUrls: ['./login-busy.component.css']
})
export class LoginBusyComponent implements OnInit {

  constructor(public authService: AuthService) { 
    //this.authService.login();
  }

  ngOnInit() {
  }

}
