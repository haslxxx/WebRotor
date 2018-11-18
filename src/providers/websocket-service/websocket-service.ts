//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { WebSockClientComponent  } from '../../components/web-sock-client/web-sock-client';
//import { HomePage } from '../../pages/home/home';

//import { Observer } from 'observer';
import {Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

/*
  Generated class for the WebsocketServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketServiceProvider {

  ws: WebSocket;  
  position: string ;
  messages = [];
  myObservable;
  mySubject;

  constructor() {
    console.log('Hello WebsocketServiceProvider Provider');
    this.ws = new WebSocket('ws://10.0.0.175',[]);
    this.initListeners();
    this.mySubject  = new Subject();
    this.myObservable = new Observable();
//    this.subscribeObservable();
  }

 


  public sendMessage = function(message){
      this.ws.send(message);
  };

  public initListeners() { //
    console.log ("EventListenersInit");

    this.ws.addEventListener('open', event => {
      console.log("WS.open");
      this.messages.push({content: "Rotor Connected"});        
    });

    this.ws.addEventListener('message', event => {
      console.log("WS.message " + event.data);
      this.messages.push(JSON.parse(event.data));
      this.position = event.data;
      //################### SUBJECT #########################
      this.mySubject.next(this.position);
/*      
      this.myObservable.create(observer => {
        observer.next(this.position);
      });
*/    // this.myObservable.next(this.position);
  
    });

    this.ws.addEventListener('close', event => {
      console.log("WS.close");
      this.messages.push({content: "You have been disconnected"});
    });

    this.ws.addEventListener('error', event => {
        console.log("The socket had an error " + event);
    });
  }

  public ngOnDestroy() {
      this.ws.close();
  }



//################################ Observer ##########################  geht alles nicht
// Neue versuche mit  RxJS
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

  public getSubjectObject() {
    return this.mySubject;
  }


}
