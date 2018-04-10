import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { TabsPage } from '../pages/tabs/tabs';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  showSplash = true;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public key:Keyboard) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.hide();
      statusBar.styleDefault();
      key.disableScroll(true);
        timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    });
  }
}
