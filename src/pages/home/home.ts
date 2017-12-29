import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { QuestionProvider } from '../../providers/question/question';
import { LoadingController } from 'ionic-angular';
//import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('slides') slides: any;
 
    hasAnswered: boolean = false;
    score: number = 0;
 
    slideOptions: any;
    questions: any;
    mode:any;
 
    
  constructor(private http: Http, public navCtrl: NavController, public dataService: QuestionProvider,public loadingCtrl: LoadingController) {
      this.mode="Let's Play!"
  }
 /*ionViewDidLoad() {
 
        this.slides.lockSwipes(true);
 
        this.dataService.load().then((data) => {
            data.map((question) => {
 
                let originalOrder = question.answers;
                question.answers = this.randomizeAnswers(originalOrder);
                return question;
 
            });    
 
            this.questions = data;
 
        });
 
    }*/
    
    loadEasy(){
        this.slides.lockSwipes(true);
        let loading = this.loadingCtrl.create({
    content: 'Loading Easy Please Wait...'
  });
        loading.present();
        this.dataService.fetchEasy().then((data) => {
            /*data.map((question) => {
 
                let originalOrder = question.answers;
                question.answers = this.randomizeAnswers(originalOrder);
                return question;
 
            }); */   
 
            this.questions = data.questions;
            this.mode=data.type;
            setTimeout(() => {
                this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
                loading.dismiss();
                }, 1000);
 
        });
    }
    
    
    loadMedium(){
        this.slides.lockSwipes(true);
        let loading = this.loadingCtrl.create({
    content: 'Loading Medium Please Wait...'
  });
        loading.present();
        this.dataService.fetchMedium().then((data) => {
           /* data.map((question) => {
                let originalOrder = question.answers;
                question.answers = this.randomizeAnswers(originalOrder);
                return question;
 
            });*/    
            this.questions = data.questions;
            this.mode=data.type;
            setTimeout(() => {
                this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
                loading.dismiss();
                }, 1000);
 
        }).catch((error)=>{
            alert("Error infetching Medium");
            console.log(error);
        });
    }
    
    loadHard(){
        this.slides.lockSwipes(true);
        let loading = this.loadingCtrl.create({
    content: 'Loading Hard Please Wait...'
  });
        loading.present();
        this.dataService.fetchHard().then((data) => {
            /*data.map((question) => {
 
                let originalOrder = question.answers;
                question.answers = this.randomizeAnswers(originalOrder);
                return question;
 
            });    */
 
            this.questions = data.questions;
            this.mode=data.type;
            setTimeout(() => {
                this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
                loading.dismiss();
                }, 1000);
 
        });
    }
 
    nextSlide(){
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }
 
    selectAnswer(answer, question){
 
        this.hasAnswered = true;
        answer.selected = true;
        //question.flashCardFlipped = true;
 
        if(answer.correct){
            this.score++;
        }
 
        setTimeout(() => {
            this.hasAnswered = false;
            this.nextSlide();
            answer.selected = false;
            question.flashCardFlipped = false;
        }, 3000);
    }
 
    randomizeAnswers(rawAnswers: any[]): any[] {
 
        for (let i = rawAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = rawAnswers[i];
            rawAnswers[i] = rawAnswers[j];
            rawAnswers[j] = temp;
        }
 
        return rawAnswers;
 
    }
 
    restartQuiz() {
        this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(1, 1000);
        this.slides.lockSwipes(true);
    }
}
