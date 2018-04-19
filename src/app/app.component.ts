import { Component } from '@angular/core';
import { App, Platform, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { TabsPage } from '../pages/tabs/tabs';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  showSplash = true;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public key: Keyboard, public actionSheetCtrl: ActionSheetController, public app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.hide();
      statusBar.styleDefault();
      key.disableScroll(true);
      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s

      //Registration of push in Android and Windows Phone
      platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()) { //Can we go back?
          nav.pop();
        } else {
          let actionSheet = this.actionSheetCtrl.create({
            title: 'Really wanna Exit ?',
            buttons: [
              {
                text: 'Yes',
                handler: () => {
                  platform.exitApp(); //Exit from app
                }
              }, {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          actionSheet.present();
        }
      });
    });
  }
}
