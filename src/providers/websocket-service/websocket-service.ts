import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {AboutPage} from '../../pages/about/about';

//<app-news-input #input (ok)="list.refresh()"></app-news-input>

@Injectable()
export class WebsocketServiceProvider {
  //@Input () newIp: string;
//  URL: string = 'ws://10.0.0.175';
  IP: string = '10.0.0.176';

  ws: WebSocket;  

//  @Output('bearing')   position1 = new EventEmitter(); 
  
  
  //messages = [];

  //myObservables;
  position: string;  // Actual Position value from Backend
  myPositionSubject;

  wsOpen: boolean = false;  // WS connection open/closed
  myWsOpenSubject;

  wsConnectionActivity: boolean = false;

  // TODO  zum funktionieren bringen
  //alertCtrl: AlertController;

//  constructor(public alertCtrl: AlertController) {
    constructor() {
      console.log('Hi from WebsocketServiceProvider (WS)');
      this.ws = new WebSocket('ws://' + this.IP ,[]);
//      this.ws = new WebSocket('ws://10.0.0.175' ,[]);
//      this.ws = new WebSocket(this.URL ,[]);
      this.initListeners();
      this.myPositionSubject  = new Subject();
      this.myWsOpenSubject  = new Subject();

      this.startCheckSocketLiveStatus();

      //this.subscribeSubjects(); // für IP übergabe ############################# KRAWUMM ################


//    this.alertCtrl = new AlertController();  will irgendwelche parameter die ich nicht kenne
  }

  @Input('newip')
  set name(ip: string) {
    console.log('WS: @Input: IP = ' + ip);
  }

  ngOnChange() {
    console.log('WS: onChange: IP = ' + this.IP);
  }
  
  // TODO #####################################
  setIp(ip) {  // TODO funktioniert nicht (vermutlich weil about.ts eine andere instanz benutzt)
    console.log("WS: received new IP: " + ip);
    this.IP = ip;
    // vorübergehend ausser kraft gesetzt    
    //this.closeWebSocket;
    // hier bräuchte man ein abwarten auf das close event
    this.openWebSocket;
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
    if(this.ws) {
      this.ws.send(message);
      this.wsConnectionActivity = true; // to inhibit the alive test
    }
  };

  public openWebSocket() {
    console.log("WS: connect attempt " + this.ws + "IP: " + this.IP);
    if (this.ws == undefined) {
      console.log("WS: connect attempt");
//      this.ws = new WebSocket('ws://' + URL,[]);// etwas umständlich .. aber es gibt kein  ws.open  oder ws.connect
      this.ws = new WebSocket('ws://' + this.IP ,[]);// etwas umständlich .. aber es gibt kein  ws.open  oder ws.connect
      this.initListeners();

      console.log("WS: ON: " + this.wsOpen);
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
          alert("ERROR -" + code + "- " + text); // so gehts auch !
        }
      }
      var bearing = jsonObj["bearing"];
      if (bearing !== undefined) {  // data arrived
        this.position = bearing;
        this.myPositionSubject.next(this.position); //send Observable data
//        this.position1.emit(this.position); // Dasselbe nur über input/output
      }  
    });

    this.ws.addEventListener('close', event => {
      console.log("WS.close");
      this.wsOpen = false;
      this.myWsOpenSubject.next(this.wsOpen); //send Observable data (to home.ts)
      //this.messages.push({content: "You have been disconnected"});
    });

    this.ws.addEventListener('error', event => {
        console.log("WS.The socket had an error " + event);
        this.wsOpen = false;
        this.myWsOpenSubject.next(this.wsOpen); //send Observable data (to home.ts)
    });
  }

  public ngOnDestroy() {
    console.log("WS.ngOnDestroy fired ");
    this.ws.close();
  }



  // ÜBERFLÜSSIG !!
  /*
  myIpSubject;
  subscribeSubjects() { //das praktischere Observable
    this.myIpSubject = this.aboutPage.getIpSubject();
    this.myIpSubject.subscribe((data) => { 
      this.setIp(data);
    });
  }
*/


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
