import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.css']
})
export class LoginErrorComponent implements OnInit {

  constructor(public authService: AuthService,
      private router: Router,
) {
  }

  ngOnInit() {
    console.log(this.authService);
    
  }


  tryAgain()
  {
    this.authService.login();
  }

  cancel()
  {
    this.router.navigate(["/home"])
  }
}
