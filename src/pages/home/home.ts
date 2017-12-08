import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  
    public apiHost: string = './assets/data/easy.json';
     public file: string = './assets/data/medium.json';
     public fileurl: string = './assets/data/hard.json';
    
  constructor(private http: Http, public navCtrl: NavController) {
      
  }
 
  public easy(): Promise<Object> {
      return this.http.get(this.apiHost)
        .toPromise()
        .then((response) => {
          console.log(response);
           var data=response.json();
           console.log(data.puzzle.content[0].question);
          alert(data.puzzle.content[0].question);
          return response.json();
                 }).catch((err) => {
        console.log(err);
      });
  }

    public medium(): Promise<Object> {
      return this.http.get(this.file)
        .toPromise()
        .then((response) => {
           var data=response.json();
           console.log(data);
          return response.json();
                 }).catch((err) => {
        console.log(err);
      });
  }
    
    public hard(): Promise<Object> {
      return this.http.get(this.fileurl)
        .toPromise()
        .then((response) => {
           var data=response.json();
           console.log(data);
          return response.json();
                 }).catch((err) => {
        console.log(err);
      });
  }
}
