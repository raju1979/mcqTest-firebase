import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { ServicesDataProvider } from '../../services/services-data';
import { StartTestPage } from '../start-test/start-test';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categoriesData:any;

  constructor(public navCtrl: NavController, private _dataService:ServicesDataProvider,private _menuCtrl:MenuController) {
    this._dataService.getCategoriesList()
      .subscribe(
        (data) => {
          console.log(data);
          this.categoriesData =data;
        }
      )
  };//

  ionViewWillEnter(){
    this._menuCtrl.enable(true);
  }

  selectTestCategory(category){
    console.log(category);
    this.navCtrl.push(StartTestPage,{data:category});
  }




}
