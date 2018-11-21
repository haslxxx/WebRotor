//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { WebSockClientComponent  } from '../../components/web-sock-client/web-sock-client';
//import { HomePage } from '../../pages/home/home';

//import { Observer } from 'observer';
import {Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import { AlertController } from 'ionic-angular';

/*
  Generated class for the WebsocketServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketServiceProvider {

  URL: string = '10.0.0.175';

  ws: WebSocket;  
  
  //messages = [];

  //myObservables;
  position: string;  // Actual Position value from Backend
  myPositionSubject;

  wsOpen: boolean = false;  // WS connection open/closed
  myWsOpenSubject;

  wsConnectionActivity: boolean = false;

  // TODO  zum funktionieren bringen
  alertCtrl: AlertController;

//  constructor(public alertCtrl: AlertController) {
    constructor() {
      console.log('Hi from WebsocketServiceProvider (WS)');
//      this.ws = new WebSocket('ws://' + URL ,[]);
      this.ws = new WebSocket('ws://10.0.0.175' ,[]);
      this.initListeners();
      this.myPositionSubject  = new Subject();
      this.myWsOpenSubject  = new Subject();

      this.startCheckSocketLiveStatus();
//      this.myObservable = new Observable();
//    this.alertCtrl = new AlertController();  will irgendwelche parameter die ich nicht kenne
//    this.subscribeObservable();
  }
  
  public getPositionSubject() {
    return this.myPositionSubject;
  }

  public  getWsOpenSubject() {
    return this.myWsOpenSubject;
  }


  startCheckSocketLiveStatus() { // broken connection is not detected by eventlistener (close) until a packet is sent
    var that=this;
    setInterval(function () { 
      if (!that.wsConnectionActivity) {     // connection was not used lately   
        if (that.wsOpen) {
          that.sendMessage("{\"cmd\":\"ALIVETEST\"}");
        }          
      } else {that.wsConnectionActivity = false}; // connection was used lately anyway
    }, 30000); //every 30 seconds
  }


  public sendMessage = function(message){
      this.ws.send(message);
      this.wsConnectionActivity = true; // to inhibit the alive test
  };

  public openWebSocket() {
    console.log("WS: connect attempt " + this.ws);
    if (this.ws == undefined) {
      console.log("WS: connect attempt");
//      this.ws = new WebSocket('ws://' + URL,[]);// etwas umständlich .. aber es gibt kein  ws.open  oder ws.connect
      this.ws = new WebSocket('ws://10.0.0.175',[]);// etwas umständlich .. aber es gibt kein  ws.open  oder ws.connect
      this.initListeners();
      this.myWsOpenSubject.next(this.wsOpen); //send Observable data (to home.ts)
    }
  }

  public closeWebSocket() {
    if (this.ws != undefined) {
      this.ws.close();
      this.ws = undefined; // etwas umständlich .. aber es gibt kein  ws.open  oder ws.connect
      this.myWsOpenSubject.next(this.wsOpen); //send Observable data (to home.ts)
    }
  }

  public getWsStatus() {
    return this.wsOpen;
  }

  public initListeners() { //
    console.log ("WS.EventListenersInit");

    this.ws.addEventListener('open', event => {
      console.log("WS.open");
      this.wsOpen = true;
      this.myWsOpenSubject.next(this.wsOpen); //send Observable data (to home.ts)
      //this.messages.push({content: "Rotor Connected"});        
    });

    this.ws.addEventListener('message', event => {
      this.wsConnectionActivity = true; // to inhibit the alive test
      console.log("WS.message " + event.data);
      // TODO  errorhandling für JSON.parse  .. falls ein ungültiger json kommt
      var jsonObj = JSON.parse(event.data);
      var reply = jsonObj["reply"];

      if (reply !== undefined) {  // data arrived
        //console.log("reply --> " + reply);
        if (reply == "OK") {
          // schön, aber was tun außer freuen ??
        }
        if (reply == "ERR") {
          var code = jsonObj["code"];
          var text = jsonObj["text"];
//          this.showAlert(code, text); // TODO zum funktionieren bringen
          alert("ERROR -" + code + "- " + text); // so gehts auch !
        }
      }
      var bearing = jsonObj["bearing"];
      if (bearing !== undefined) {  // data arrived
        this.position = bearing;
        this.myPositionSubject.next(this.position); //send Observable data
      }  
    });

    this.ws.addEventListener('close', event => {
      console.log("WS.close");
      this.wsOpen = false;
      this.myWsOpenSubject.next(this.wsOpen); //send Observable data (to home.ts)
      //this.messages.push({content: "You have been disconnected"});
    });

    this.ws.addEventListener('error', event => {
        console.log("The socket had an error " + event);
    });
  }

  public ngOnDestroy() {
      this.ws.close();
  }


  
  // GEHT NICHT OHNE Alertcontroller, gibts aber nicht
  showAlert(code, message) {
    const alert = this.alertCtrl.create({
      title: 'ERROR --' + code, subTitle: message, buttons: ['OK']
    });
    alert.present();
  }


//################################ Observer ##########################  geht alles nicht
// Neue versuche mit  RxJS
/*
  public subscribeObservable() {

    this.myObservable.create(observer => {
      observer.next(this.position);
    });
   // this.myObservable.next(this.position);
    this.myObservable.subscribe((data) => {console.log("MyData" + data);} )
  }

  public getObserverObject() {
    return this.myObservable;
  }
/*
//################### SUBJECT #########################  funktioniert wunderbar
  //mySubject = new Subject();  -->   Nach Oben (konstruktor) gewandert !
  /*
  public setSubject() {    --> brauchen wir hier nicht, subscription im ziel (home.ts)
    this.mySubject.subscribe((data) => {
      console.log(data);
    });

    this.mySubject.next(this.position); -->   Nach Oben gewandert (wo die daten entstehen .. onMessage) !
  }
  */


}
