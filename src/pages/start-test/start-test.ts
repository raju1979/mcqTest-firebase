import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides,ModalController  } from 'ionic-angular';

import { ServicesDataProvider } from '../../services/services-data';
import { TestResultPage } from '../test-result/test-result';


@Component({
  selector: 'page-start-test',
  templateUrl: 'start-test.html',
})
export class StartTestPage {

  @ViewChild(Slides) slides: Slides;

    categoryDoc:any;
  
    categoryData: any;
  
    mcqData: any;
  
    httpRequestStart: boolean = false;
  
    currentIndex: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _dataService:ServicesDataProvider,private _modalCtrl:ModalController,private _platform: Platform) {

    this.categoryDoc = this.navParams.get('data');
    console.log(this.categoryData);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartTestPage');
  }
  

  ngOnInit(){
    this._dataService.getCategoryDocument(this.categoryDoc.id)
      .subscribe(
        (data) => {
          this.categoryData = data;
          this.fetchMcqJson(data);
        }
      )
  }

  fetchMcqJson(data) {
    this.httpRequestStart = true;
    this._dataService.getMcqJsonFromFirebase(this.categoryData.question_url)
      .subscribe(
      (data) => {
        this.mcqData = data.json();
        this.httpRequestStart = false;
        console.log(this.mcqData);
      },
      (error) => {
        this.httpRequestStart = false;
        console.log(error);
      }
      )
  };//

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', this.currentIndex);

    console.log(this.slides.isBeginning());
    if (this.slides.isEnd()) {
      this.currentIndex = this.mcqData.data.length - 1;
    }
    if (this.slides.isBeginning()) {
      this.currentIndex = 0;
    }

  };//

  checkAnswer(questionNum: number, optionIndex: number, option: any) {
    console.log(option);
    console.log(this.mcqData.data[questionNum].questiondata.userChoice);
    this.mcqData.data[questionNum].questiondata.userChoice = option.optionid;

    this.mcqData.data[questionNum].questiondata.isAnswered = 'yes';

    let correctAnswerId = this.mcqData.data[questionNum].answer.answerid;
    let userChoice = option.optionid;

    if (correctAnswerId == userChoice) {
      console.log("CORRECT");
      this.mcqData.data[questionNum].questiondata.isCorrect = true;
    } else {
      console.log("WRONG");
      this.mcqData.data[questionNum].questiondata.isCorrect = false;;
    }
  };//

  setOptionBg(item, option) {
    if (item.questiondata.userChoice == option.optionid) {
      return "#bbdefb";
    } else {
      return "#F59833";
    }
  };//

  setAnswerChoice(item, option) {

    let correctAnswerId = item.answer.answerid;
    let userChoice = option.optionid;

    if (item.questiondata.isAnswered == 'yes') {
      if (correctAnswerId == userChoice) {
        return "green";
      } else {
        return "red";
      }

    }
  };//

  gotoPreviousSlide() {
    console.log(`BACK::${this.currentIndex}`)
    if (this.currentIndex > 0) {
      this.slides.slideTo(this.currentIndex - 1, 100);
    }
  }

  goToNextSlide() {
    console.log(`NEXT::${this.currentIndex}`)
    if (this.currentIndex < this.mcqData.data.length - 1) {
      this.slides.slideTo(this.currentIndex + 1, 100);
    }
  };//

  showMarks() {
   
    

    let modal = this._modalCtrl.create(TestResultPage,{data:this.mcqData.data});
    modal.onDidDismiss(data => {
      console.log(data);
      setTimeout(() => {
        this.navCtrl.pop();
      })      
    });
    modal.present();
    
  }

}
