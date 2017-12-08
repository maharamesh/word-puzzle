import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public apiHost: string = './assets/data/easy.json';
  constructor(private http: Http, public navCtrl: NavController) { }
 
  public getAll(): Promise<Object> {
      return this.http.get(this.apiHost)
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
