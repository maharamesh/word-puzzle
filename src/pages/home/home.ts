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
    AlertMessages:any;
    showAlert:any;
    mode:any;
    
  constructor(private http: Http, public navCtrl: NavController, public dataService: QuestionProvider,public loadingCtrl: LoadingController) {
      this.mode="Let's Play!"
     
  }
    
        checkAnswer(answerVal,que) {
//        this.range = newValue;
        /*console.log(answerVal);
        console.log(que);
        console.log(que.answers);
        console.log(answerVal);*/
            if(que.answers.length==answerVal.length)
                {
            if(que.answers==answerVal)
                {
                    this.checkStatus=true;
                    this.AlertMessages='BRAVO!!';
                    this.checkStatusError=false;
                    // alert("Correct");
                    this.showAlert=false;
                    this.hasAnswered = true;
                    this.selectAnswer();
                    this.checkStatus=false;
                }
            else
                {
                    this.checkStatusError=true;
                    this.checkStatus=false;
                    this.showAlert=false;
                    this.AlertMessages='Oops,Its a '+que.answers.length +' letter word only!';
                    // alert("wrong");
                }
                }
            else if(que.answers.length<answerVal.length)
                {
                    this.showAlert=true;
                    this.checkStatus=false;
                    this.checkStatusError=false;
                }
            else
                {
                    this.showAlert=false;
                    this.checkStatus=false;
                    this.checkStatusError=false;
                }
            
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
        this.score = 0;
//        this.question.ans=[];
        this.slides.lockSwipes(false);
        this.slides.slideTo(0, 1000);
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
            this.questions=[];
            this.questions = data.questions;
            this.mode=data.type;
            setTimeout(() => {
                this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
                this.maxtime=30;
                this.stopTimer=this.questions.length;
                this.StartTimer();
                loading.dismiss();
                }, 1000);
            
        });
    }
    
    
    loadMedium(){
        this.score = 0;
//        this.question.ans=[];
        this.slides.lockSwipes(false);
        this.slides.slideTo(0, 1000);
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
            this.questions=[];
            this.questions = data.questions;
            this.mode=data.type;
            setTimeout(() => {
                this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
                this.maxtime=30;
                this.stopTimer=this.questions.length;
                this.StartTimer();
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
    

 
    selectAnswer(){
 
        /*this.hasAnswered = true;
        answer.selected = true;*/
        //question.flashCardFlipped = true;
 
        /*if(answer.correct){
            this.score++;
        }*/
            this.score++;
            this.maxtime=30;
//            this.StartTimer();
        console.log(this.questions.length);
            /*if(this.stopTimer!=this.questions.length)
                  {*/
              this.stopTimer=this.stopTimer-1;
//                  }
            this.hasAnswered = false;
            this.nextSlide();
        
        /*setTimeout(() => {
            answer.selected = false;
            question.flashCardFlipped = false;
        }, 3000);*/
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
//        this.question.ans=[];
        this.slides.lockSwipes(false);
        this.slides.slideTo(1, 1000);
        this.slides.lockSwipes(true);
    }
    maxtime: any=30;
    timerVal:any;
    stopTimer:any;
  StartTimer(){
    this.timer = setTimeout(x => 
      {
          if(this.maxtime <= 0) { }
          this.maxtime -= 1;
//            console.log(this.maxtime);
            this.timerVal=this.maxtime;
          if(this.maxtime>0){
//            this.hidevalue = false;
            console.log(this.stopTimer);
              if(this.stopTimer!=0){
            this.StartTimer();
              }
          }
          
          else{
              this.maxtime=30;
              this.hasAnswered = false;
              this.nextSlide();
              this.stopTimer=this.stopTimer-1;
              if(this.stopTimer!=0){
              this.StartTimer();
              }
//              this.hidevalue = true;
          }

      }, 1000);
 

  }

}
