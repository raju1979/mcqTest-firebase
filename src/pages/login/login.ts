import { HomePage } from './../home/home';
// import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, MenuController, Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { RegisterPage } from '../register/register';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {





  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,  private _alertCtrl: AlertController, private _menuCtrl:MenuController,private _platform:Platform,private _authService:AuthService) {

    // this.userItemRef$ = this._angualrFireDB.list('users');
    // this.userItemRef$.subscribe(
    //   (data) => {
    //     console.log(data);
    //   }
    // )

  }

  ionViewWillEnter(){
    this._menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async doLogin(event) {
    console.log(event);
    console.log(this.loginForm.value);
    this._authService.login(this.loginForm.value.email,this.loginForm.value.password)
      .then((data) => {
        this.navCtrl.setRoot(HomePage)
      })
      .catch((err) => {
        this.showErrorAlert(err);
      })
    

  };//end doLogin

  checkIfEmailVerified(data){
    
  };//



  showErrorAlert(msg?: string) {
    let alert = this._alertCtrl.create({
      title: 'Error',
      subTitle: `There is some error ${msg}`,
      buttons: ['OK']
    });
    alert.present();
  }

  showSuccessAlert(msg?: string) {
    let alert = this._alertCtrl.create({
      title: 'Error',
      subTitle: `There is some error ${msg}`,
      buttons: ['OK']
    });
    alert.present();
  };//

  gotoRegistration(){
    this.navCtrl.push(RegisterPage);
  };//

  getLogoImg(){
    if (this._platform.is('core')) {
      return "../assets/img/brain_storm-logo.png";
    } else if (this._platform.is('android')) {
      return "assets/img/brain_storm-logo.png";
    } else {
      return "assets/img/brain_storm-logo.png";
    }
  }

}
