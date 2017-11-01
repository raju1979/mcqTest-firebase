import { Injectable } from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private _afAuth:AngularFireAuth) { }

  //  checkUserStatus
  getAuth(){
    return this._afAuth.authState.map(auth => auth);
  }

  login(email: string, password: string) {
    return this._afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      
  }

  logout() {
    return this._afAuth
      .auth
      .signOut()
  }

  signUp(userData){
    return this._afAuth
    .auth
    .createUserWithEmailAndPassword(userData.email, userData.password)
  }

}
