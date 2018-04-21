//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the QuestionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionProvider {
    data: any;
    constructor(public http: Http) {
    }
    fetchEasy() {
        this.data = '';
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {

            this.data = [];
            this.http.get('assets/data/easy.json').map(res => res.json()).subscribe(data => {
               // console.log(data);
                this.data = data;
                resolve(this.data);
            });

        });

    }

    fetchMedium() {
        this.data = '';
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {

            this.data = [];
            this.http.get('assets/data/medium.json').map(res => res.json()).subscribe(data => {
               // console.log(data);
                this.data = data;
                resolve(this.data);
            });

        });

    }


    fetchHard() {
        /*    if(this.data){
                    return Promise.resolve(this.data);
                }*/

        return new Promise(resolve => {

            this.http.get('assets/data/hard.json').map(res => res.json()).subscribe(data => {
                this.data = data;
                resolve(this.data);
            });

        });

    }
    

}
