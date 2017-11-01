import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import {FIREBASE_CREDENTIALS} from "./firebase.credential";

//import firebase + angularfire2
import {AngularFireModule} from 'angularfire2';
import{AngularFireDatabase} from 'angularfire2/database';
import{AngularFireAuth} from 'angularfire2/auth';

import { AngularFirestoreModule } from 'angularfire2/firestore';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {HttpModule} from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { RegisterPage } from '../pages/register/register';
import { ServicesDataProvider } from '../services/services-data';
import { StartTestPage } from '../pages/start-test/start-test';
import { TestResultPage } from '../pages/test-result/test-result';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    StartTestPage,
    TestResultPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    StartTestPage,
    TestResultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,AngularFireAuth,
    ServicesDataProvider
  ]
})
export class AppModule {}
