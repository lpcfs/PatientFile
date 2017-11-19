import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { NgZone } from '@angular/core';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  public succeed: boolean;
  public failed: boolean;
  public exception: any;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private _ngZone: NgZone
  ) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(_ => {
        this.succeed = true;
        this.failed = false;
        this._ngZone.run(() => this.router.navigateByUrl('/logindone'))
      })
      .catch(error => {
        this.succeed = false;
        this.failed = true;
        this.exception = error;
        console.error(error);
        this._ngZone.run(() => { this.router.navigate(['/loginerror']) })
      })
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["/logout"])
  }
}
