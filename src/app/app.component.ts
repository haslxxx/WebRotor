import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

//javaScript include test ############################### siehe Unten 
// siehe auch /src/assets/js/testjs.js   und   index.html
declare var testao ;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //javaScript include test ############################### !!!
      //alert(testao);

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
