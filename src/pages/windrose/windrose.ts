// ############ Windrose  Page  = Main page #################

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebsocketServiceProvider } from '../../providers/websocket-service/websocket-service';
//import { HomePage } from '../home/home';
//import {Subject} from 'rxjs/Subject';
import { DomSanitizer } from '@angular/platform-browser';


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
  positionGrad: String = "0"; // 0-360/450 arrowRotation
  positionRequested: string = "0"; // 0-360/450 arrowRotation
  wsp = new WebsocketServiceProvider();
  
  percent: number = 30;
  maxPercent = 254;

  
  rose = '../../assets/imgs/Windrose.png'; 
  // Typ A  pfeil = '../../assets/imgs/PfeilUmrissRot.png'; 
  // Typ B  pfeil = '../../assets/imgs/PfeilTransparent.png'; 
  pfeil = '../../assets/imgs/PfeilTransparent.png'; 
  arrowRotation: String = "195";
  arrowrotation = ""; //'translate(25px,25px) rotate(' + this.arrowRotation + 'deg)';
  arrowrotationSanitized;


  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer) {
    this.subscribeSubjects(); // Subject ist ein Observer pattern
    console.log("WindrosePage constructor !");
  }

  ionViewDidLoad() {
    console.log('Hi from WindrosePage');
    this.setPosition('350'); //Irgendeine initialposition
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
        var pos1023 =  String(((parseInt(this.positionRequested)) * (1024/360)).toFixed(0));
        this.positionRequested2command(pos1023);
      }
    }
  }

  remoteAllowChange() {
    console.log("remote: " + this.remoteChecked);
  }

  motorSpeedChange(val) {
    //console.log("SpeedChange: " + val);
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

  imageOffset: number = -90;
  setPosition(pos) {
    this.position = pos;
    this.positionGrad =  String((pos * (360/1024)).toFixed(0));
    this.percent = 1;
    this.arrowRotation =  String(((pos * (360/1024)) + this.imageOffset ).toFixed(0));

    // ENDLICH !  der rotierende Pfeil
    // Typ A   this.arrowrotation = 'translate(62px,132px) rotate(' + this.arrowRotation + 'deg)';
    // Typ B this.arrowrotation = 'translate(22px,106px) rotate(' + this.arrowRotation + 'deg)'; // links/Rects  rauf/runter 
    this.arrowrotation = 'transform: translate(22px,106px) rotate(' + this.arrowRotation + 'deg) !important'; // links/Rects  rauf/runter 
    this.arrowrotationSanitized = this.sanitizer.bypassSecurityTrustStyle(this.arrowrotation) ;
  }

  public setStyles(): any {
    let styles = {            
  
        'transform' : 'transform: translate(22px,106px) rotate(' + this.arrowRotation + 'deg);'
    };      
    return styles;
}

  setOnButton(val) {
    this.onButtonON = val;
    //console.log("setOnButton: " + val);
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
