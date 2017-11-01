import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

declare var _:any;


@Component({
  selector: 'page-test-result',
  templateUrl: 'test-result.html',
})
export class TestResultPage {

  questionArrayData:any;

  attemptedQuestionCount:number;

  correctAnswerCount:number;

  Math:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.Math = Math;
    this.questionArrayData = this.navParams.get("data");
    console.log(this.questionArrayData);
  }

  ionViewDidLoad() {
    this.correctAnswerCount = _.filter(this.questionArrayData, function (o) {
      return o.questiondata.isCorrect == true;
    });

    this.attemptedQuestionCount = _.filter(this.questionArrayData, function (o) {
      return o.questiondata.isAnswered == "yes";
    });
  };//

  closeModal(){
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

}
