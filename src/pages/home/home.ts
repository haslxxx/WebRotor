import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

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
  onButton: boolean = true;
  remoteChecked: boolean = false;
  motorSpeed: number;
  position: String = "155";
  
  wsp = new WebsocketServiceProvider();

  constructor(public navCtrl: NavController) {
    this.subscribeDataSubject();
  }

  sendButtonClicked() {
    console.log ("Send Clicked " + this.jsonX);
    //this.sendMessage(this.jsonX);
    this.wsp.sendMessage(this.jsonX);
  }

  onButtonClicked() {
    console.log("onButton: " + this.onButton);
  }

  onRemoteChange() {
    console.log("remote: " + this.remoteChecked);
  }

  motorSpeedChange() {
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"M\",\"val\":\"" + this.motorSpeed    + "\"}" );
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

  setPosition(pos) {
    this.position = pos;
  }

  //################################ OBSERVER####################
  /*  ..... geht so nicht ??  :-(
  establishObservable() {
    var observbl: Observable = this.wsp.getObserverObject;
    observbl.subscribe((data) => {console.log(data);} )
  }
*/
  mySubject; 
  subscribeDataSubject() {
    this.mySubject = this.wsp.getSubjectObject();

    this.mySubject.subscribe((data) => { 
//      console.log("homeSubscribed " + data);
      this.setPosition(data);
    });

  }



} // end Class
