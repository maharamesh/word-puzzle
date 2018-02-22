import { Component, ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { QuestionProvider } from '../../providers/question/question';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    @ViewChild(Slides) slides: Slides;
    hasAnswered: boolean = false;
    score: number = 0;
    slideOptions: any;
    questionsArray: any;
    AlertMessages: any;
    showAlert: any;
    mode: any;
    checkStatus: any;
    checkStatusError: any;
    constructor(public dataService: QuestionProvider, public loadingCtrl: LoadingController) {
        this.mode = "Let's Play!"

    }
    checkAnswer(answerVal, que) {
        if (que.answers.length == answerVal.length) {
            if (que.answers == answerVal) {
                this.checkStatus = true;
                this.AlertMessages = 'BRAVO!!';
                this.checkStatusError = false;
                // alert("Correct");
                this.showAlert = false;
                this.hasAnswered = true;
                this.selectAnswer();
                this.checkStatus = false;
            }
            else {
                this.checkStatusError = true;
                this.checkStatus = false;
                this.showAlert = false;
                this.AlertMessages = 'Oops,Its a ' + que.answers.length + ' letter word only!';
            }
        }
        else if (que.answers.length < answerVal.length) {
            this.showAlert = true;
            this.checkStatus = false;
            this.checkStatusError = false;
        }
        else {
            this.showAlert = false;
            this.checkStatus = false;
            this.checkStatusError = false;
        }

    }
    ionViewDidLoad() {

        this.slides.lockSwipes(true);

    }



    loadEasy() {
        this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(0, 1000);
        this.slides.lockSwipes(true);
        this.slides.update();
        if (this.questionsArray) {
            for (let i = 0; this.questionsArray.length > i; i++) {
                this.questionsArray[i].ans = "";
            }
        }
        let loading = this.loadingCtrl.create({
            content: 'Loading Easy Please Wait...'
        });
        loading.present();
        setTimeout(() => {
            this.dataService.fetchEasy().then((data) => {
                console.log(data);
                this.questionsArray = data.questions;
                data.questions.map((question) => {
                    let originalOrder = this.questionsArray;
                    question = this.randomizeAnswers(originalOrder);
                    return question;

                });
                this.mode = data.type;
                this.slides.lockSwipes(false);
                this.slides.slideNext();
                this.slides.lockSwipes(true);
                this.maxtime = 30;
                this.stopTimer = this.questionsArray.length;
                this.StartTimer();
                loading.dismiss();

            }).catch((error) => {
                alert("Error infetching Easy");
                console.log(error);
                loading.dismiss();
            });
        }, 1500);
    }



    loadMedium() {
        this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(0, 1000);
        this.slides.lockSwipes(true);
        this.slides.update();
        if (this.questionsArray) {
            for (let i = 0; this.questionsArray.length > i; i++) {
                this.questionsArray[i].ans = "";
            }
        }
        let loading = this.loadingCtrl.create({
            content: 'Loading Hard Please Wait...'
        });
        loading.present();
        setTimeout(() => {
            this.dataService.fetchMedium().then((data) => {
                console.log(data);
                this.questionsArray = data.questions;
                data.questions.map((question) => {
                    let originalOrder = this.questionsArray;
                    question = this.randomizeAnswers(originalOrder);
                    return question;
                });
                this.mode = data.type;
                this.slides.lockSwipes(false);
                this.slides.slideNext();
                this.slides.lockSwipes(true);
                this.maxtime = 30;
                this.stopTimer = this.questionsArray.length;
                this.StartTimer();
                loading.dismiss();

            }).catch((error) => {
                alert("Error infetching Hard");
                console.log(error);
                loading.dismiss();
            });
        }, 1000);
    }

    /*loadHard(){
        this.slides.lockSwipes(true);
        let loading = this.loadingCtrl.create({
    content: 'Loading Hard Please Wait...'
  });
        loading.present();
//        this.questionsArray=[];
            setTimeout(() => {
        this.dataService.fetchHard().then((data) => {
            data.questions.map((question) => {
             this.questionsArray = data.questions;
                let originalOrder = this.questionsArray;
                console.log(originalOrder);
                question = this.randomizeAnswers(originalOrder);
                console.log(question);
                return question;
            });
 
            this.questionsArray = data.questions;
            this.mode=data.type;
                this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
                loading.dismiss();
 
        });
                }, 1000);
    }*/

    nextSlide() {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }



    selectAnswer() {
        this.score++;
        this.maxtime = 30;
        console.log(this.questionsArray.length);
        this.stopTimer = this.stopTimer - 1;
        this.hasAnswered = false;
        this.nextSlide();
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
        this.stopTimer = 0;
        this.timerVal = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(0, 1000);
        this.slides.lockSwipes(true);
    }

    goHome() {
        this.score = 0;
        this.stopTimer = 0;
        this.timerVal = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(0, 1000);
        this.slides.lockSwipes(true);
    }
    maxtime: any = 30;
    timerVal: any;
    stopTimer: any;
    timer: any;
    StartTimer() {
        this.timer = setTimeout(x => {
            if (this.maxtime <= 0) { }
            this.maxtime -= 1;
            this.timerVal = this.maxtime;
            if (this.maxtime > 0) {
                if (this.stopTimer != 0) {
                    this.StartTimer();
                }
            }

            else {
                this.maxtime = 30;
                this.hasAnswered = false;
                this.nextSlide();
                this.stopTimer = this.stopTimer - 1;
                if (this.stopTimer != 0) {
                    this.StartTimer();
                }
            }

        }, 1000);


    }

}
