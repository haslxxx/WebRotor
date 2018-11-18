import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WebsocketServiceProvider } from '../providers/websocket-service/websocket-service';
//import { Observer } from 'observer';
//import { Socket  } from 'socket.io-client';

//import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

//const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
//const config: SocketIoConfig = { url: 'http://10.0.0.175:80', options: {} };


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp) ,
    //SocketIoModule.forRoot(config)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler} ,
    WebsocketServiceProvider
  ]
})
export class AppModule {}
