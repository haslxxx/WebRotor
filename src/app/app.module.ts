import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
//import { MainPage } from '../pages/main/main';
import { WindrosePage } from '../pages/windrose/windrose';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WebsocketServiceProvider } from '../providers/websocket-service/websocket-service';
import { AlertController } from 'ionic-angular';
//import { Observer } from 'observer';
//import { Socket  } from 'socket.io-client';

//import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

//const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
//const config: SocketIoConfig = { url: 'http://10.0.0.175:80', options: {} };

import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WindrosePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //SocketIoModule.forRoot(config)
       // Specify ng-circle-progress as an import
       NgCircleProgressModule.forRoot({
        // set defaults here
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 8,
        outerStrokeColor: "#78C000",
        innerStrokeColor: "#C7E596",
        animationDuration: 300,
        
      })
  
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WindrosePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler} ,
    WebsocketServiceProvider,
    AlertController
  ]
})
export class AppModule {}
