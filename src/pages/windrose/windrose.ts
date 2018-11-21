// ############ Windrose  Page  = Main page #################

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebsocketServiceProvider } from '../../providers/websocket-service/websocket-service';

//import {Subject} from 'rxjs/Subject';


@IonicPage()
@Component({
  selector: 'page-windrose',
  templateUrl: 'windrose.html',
})
export class WindrosePage {

//##################  Windrose  Page  ###################
  jsonX: string;
  onButtonON: boolean = true;
  remoteChecked: boolean = false;
  motorSpeed: number = 180;
  position: String = "0";  // 0 -1023
  positionGrad: String = "0"; // 0-360/450 degree
  positionRequested: string = "0"; // 0-360/450 degree
  wsp = new WebsocketServiceProvider();
  image;

  constructor(public navCtrl: NavController) {
    this.subscribeSubjects(); // Subject ist ein Observer pattern
    this.image = '../../assets/imgs/Unbenannt.PNG'; 
//    this.image = 'https://randomuser.me/api/portraits/women/79.jpg';
  }
  
  ionViewDidLoad() {
    console.log('Hi from WindrosePage');
  }

  connectButtonChange() {
    console.log("ON: " + this.onButtonON);
    if (this.onButtonON) { // switch on websocket connection
      this.wsp.openWebSocket();
    } else {
      this.wsp.closeWebSocket();
    }
  }

  positionRequestedChanged(keycode) {
    console.log("PosNew " + this.positionRequested + "  code: " + keycode);
    if (keycode == 13) {  // ENTER pressed      
      if (this.positionRequested != this.positionGrad) {
        //this.motorSpeed = parseInt(this.positionRequested);
        var pos1023 =  String(((parseInt(this.positionRequested)) * (1024/360)).toFixed(0));
        this.positionRequested2command(pos1023);
      }
    }
  }

  remoteAllowChange() {
    console.log("remote: " + this.remoteChecked);
  }

  motorSpeedChange(val) {
    console.log("SpeedChange: " + val);
    switch (val) {
      case 0: {
        break;
      }
      case 1: {
        this.motorSpeed = 101; //40%
        break;
      }
      case 2: {
        console.log("SpeedChange70: " );
        this.motorSpeed = 180; //70%
        break;
      }
      case 3: {
        this.motorSpeed = 254; //100%
        break;
      }
      default: {
        break;
      }        
    }
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"M\",\"val\":\"" + this.motorSpeed    + "\"}" );
  }

  positionRequested2command(pos) {
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"B\",\"val\":\"" + pos    + "\"}" );
  }

  leftButtonClicked() {  
    this.motorSpeedChange(0); //tun so als ob um wert zu übertragen
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"L\"}");
  }
  rightButtonClicked() {
    this.motorSpeedChange(0);
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"R\"}");
  }
  stopButtonClicked() {  
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"S\"}");
  }

  setPosition(pos) {
    this.position = pos;
    this.positionGrad =  String((pos * (360/1024)).toFixed(0));
  }

  setOnButton(val) {
    this.onButtonON = val;
  }

  myPositionSubject; 
  myOnButtonSubject;
  subscribeSubjects() { //Subject ist das praktischere Observable
    this.myPositionSubject = this.wsp.getPositionSubject();
    this.myPositionSubject.subscribe((data) => { 
      this.setPosition(data);
    });

    this.myOnButtonSubject = this.wsp.getWsOpenSubject();
    this.myOnButtonSubject.subscribe((data) => { 
      this.setOnButton(data);
    });
  }


} // end Class
