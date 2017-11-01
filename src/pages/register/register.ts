import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { FormBuilder, Validators,FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { PasswordValidation } from './../../models/password-validation';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: Observable<firebase.User>;

  public registerForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword:["",Validators.required]
  }, {
    validator: PasswordValidation.MatchPassword // your validation method
  });

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,public fb: FormBuilder,private _platform:Platform,private _authService:AuthService,private _alertCtrl: AlertController) {
    // afAuth.authState.subscribe((
    //   (data) => console.log(data)
    // ))
    // console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister($event){
    console.log($event);
    console.log(this.registerForm.value);
    this._authService.signUp(this.registerForm.value)
      .then((data) => {
        console.log("successfully registred")
      })
      .catch((err) => {
        this.showErrorAlert(err)
      })
  };//

  getLogoImg(){
    if (this._platform.is('core')) {
      return "../assets/img/brain_storm-logo.png";
    } else if (this._platform.is('android')) {
      return "assets/img/brain_storm-logo.png";
    } else {
      return "assets/img/brain_storm-logo.png";
    }
  };//

  showErrorAlert(msg?: string) {
    let alert = this._alertCtrl.create({
      title: 'Error',
      subTitle: `There is some error ${msg}`,
      buttons: ['OK']
    });
    alert.present();
  }

}
