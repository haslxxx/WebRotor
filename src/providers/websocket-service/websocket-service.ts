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
  setPosition ;
  myObservable;

//  constructor(public http: HttpClient) {
//    constructor(home: HomePage) {
      constructor() {
//        this.home = home;
      console.log('Hello WebsocketServiceProvider Provider');
      this.ws = new WebSocket('ws://10.0.0.175',[]);
      this.initListeners();

      this.setObservable();
  }

  //ws = new WebSocket('ws://10.0.0.175',[]);
  messages = [];

  public sendMessage = function(message){
//    public sendMessage (){
      this.ws.send(message);

  };

  public initListeners() { //
    console.log ("EventListenersInit");
    this.ws.addEventListener('open', event => {
      console.log("WS.open");
            this.messages.push({content: "Welcome to the chat!"});
        
    });
    this.ws.addEventListener('message', event => {
//        this.zone.run(() => {
  console.log("WS.message " + event.data);
            this.messages.push(JSON.parse(event.data));
//            this.setPosition(event.data);
//        });
    });
    this.ws.addEventListener('close', event => {
//        this.zone.run(() => {
  console.log("WS.close");
            this.messages.push({content: "You have been disconnected"});
//        });
    });
    this.ws.addEventListener('error', event => {
        console.log("The socket had an error " + event);
    });
}

public ngOnDestroy() {
    this.ws.close();
}

//Observer = require("observer");

//################################ Observer ##########################
// Neue versuche mit  RxJS
public setObservable() {
//  this.setPosition = callback;

  let myObservable = Observable.create(observer => {
    observer.next("hello").next(this.setPosition);

  });
  this.myObservable = myObservable;

  // DAS gehört eigentlich in home.ts
  // macht aber hier schon Krawumm :-(
  //  myObservable.subscribe((data) => {console.log(data);} )
}

public getObserverObject() {
  return this.myObservable;
}



}
