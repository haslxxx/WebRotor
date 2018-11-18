import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WebsocketServiceProvider } from '../../providers/websocket-service/websocket-service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import {Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


//import { Socket } from 'ng-socket-io';
//import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  jsonX: string;
  position: String = "155";
  wsp = new WebsocketServiceProvider();

  constructor(public navCtrl: NavController) {
    //this.establishCallback();
  }

  sendButtonClicked() {
    console.log ("Send Clicked " + this.jsonX);
    //this.sendMessage(this.jsonX);
    this.wsp.sendMessage(this.jsonX);
  }

  leftButtonClicked() {  
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"L\"}");
  }
  rightButtonClicked() {
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"R\"}");
  }
  stopButtonClicked() {  
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"S\"}");
  }

  //################################ OBSERVER####################
  /*  ..... geht so nicht ??  :-(
  establishObservable() {
    var observbl: Observable = this.wsp.getObserverObject;
    observbl.subscribe((data) => {console.log(data);} )
  }
*/


  // ###############obsolete######################
  /*
  public setPosition(pos) {
    this.position = pos;
  }
*/

/*
  //declare function fn(): string;
  public myCallback: (name: string) => string;

  establishCallback () {
//    this.wsp.getPositionCallback( {function(x) {this.position = String(x);} });
    this.wsp.getPositionCallback(this.myCallback("x"));
  }
  

}
*/


/*
export class HomePage {
  jsonX: String;

  constructor(public navCtrl: NavController) {

  }


  sendButtonClicked() {
    console.log ("Send Clicked " + this.jsonX);
  }
*/


} // end Class
