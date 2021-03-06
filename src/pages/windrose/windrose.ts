// ############ Windrose  Page  = Main page #################

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebsocketServiceProvider } from '../../providers/websocket-service/websocket-service';
//import { HomePage } from '../home/home';
//import {Subject} from 'rxjs/Subject';
import { DomSanitizer } from '@angular/platform-browser';

import { StorageProvider, Callsign } from '../../providers/storage/storage';


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
  pfeil = '../../assets/imgs/PfeilUmrissRot.gif'; 
  arrowRotation: String = "195";
  arrowrotation = ""; //'translate(25px,25px) rotate(' + this.arrowRotation + 'deg)';
  arrowrotationSanitized;

  //gotoStationBearing: String ="";
  showCallsigns: boolean = false;
  callsigns: Array<Callsign>;
  headingToCall: string = "---";

  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer , public storage: StorageProvider) {
    this.subscribeSubjects(); // Subject ist ein Observer pattern
    console.log('Hi from WindrosePage (WRP)');
  }

  ionViewDidLoad() {
    console.log('WRP: WindrosePage did load');
    this.setPosition('350'); //Irgendeine initialposition
  }

  connectButtonChange() {
    console.log("WRP: OnButton: " + this.onButtonON);
    if (this.onButtonON) { // switch on websocket connection
      this.wsp.openWebSocket();
    } else {
      this.wsp.closeWebSocket();
    }
  }

  degTo1024(deg:string){
    return String(((parseInt(deg)) * (1024/360)).toFixed(0));
  }

  positionRequestedChanged(keycode) {
    console.log("WRP: PosNew " + this.positionRequested + "  code: " + keycode);
    if (keycode == 13) {  // ENTER pressed      
      if (this.positionRequested != this.positionGrad) {
//        var pos1023 =  String(((parseInt(this.positionRequested)) * (1024/360)).toFixed(0));
        var pos1023 = this.degTo1024(this.positionRequested);
        this.positionRequested2command(pos1023, "---");
      }
    }
  }

  remoteAllowChange() {
    console.log("WRP: remote: " + this.remoteChecked);
  }

  motorSpeedChange(val) {
    console.log("WRP: SpeedChange: " + val);
    switch (val) {
      case 0: {
        break;
      }
      case 1: {
        this.motorSpeed = 101; //40%
        break;
      }
      case 2: {
//        console.log("WRP: SpeedChange70: " );
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


  positionRequested2command(pos, call) {
    this.headingToCall = call;
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"B\",\"val\":\"" + pos    + "\"}" );
  }


  leftButtonClicked() {  
    this.headingToCall = "---";
    this.motorSpeedChange(0); //tun so als ob um wert zu übertragen
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"L\"}");
  }
  rightButtonClicked() {
    this.headingToCall = "---";
    this.motorSpeedChange(0);
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"R\"}");
  }
  stopButtonClicked() {  
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"S\"}");
  }

  gotoStationClicked() { // show stationlist for selection
    this.callsigns = this.storage.getCallArray();
    this.showCallsigns = true;
  }
  callSelected(event, callsign) { // user selected a station to turn antenna to
    console.log("WRP: call selected: " + callsign.call)
    this.showCallsigns = false;
    this.positionRequested = callsign.bearing;
//    console.log("WRP: call selected: " + callsign.call)
    this.positionRequested2command(this.degTo1024(callsign.bearing), callsign.call 	);
  }
  stationListExit() { //user exits station list without selection
    this.showCallsigns = false;
  }

  // #############  SUCHE
  onSearch(ev: any) {
    this.callsigns = this.storage.getCallArray();    //Ganze liste herstellen
    const val = ev.target.value; //Suchstring aus der searchbar   
    if (val && val.trim() != '') { // Wenn suchstring leer .. nix filtern
      this.callsigns = this.callsigns.filter((item) => {
        return (item.call.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
/*
  public setGotoStationBearing(bearing) {
    console.log("Goto Bearing received " + bearing);
  }
*/
//  imageOffset: number = -90;
  imageOffset: number = 0;
  setPosition(pos) {
    this.position = pos;
    this.positionGrad =  String((pos * (360/1024)).toFixed(0));
    this.percent = 1;
    this.arrowRotation =  String(((pos * (360/1024)) + this.imageOffset ).toFixed(0));

    // ENDLICH !  der rotierende Pfeil
    // Typ A   this.arrowrotation = 'translate(62px,132px) rotate(' + this.arrowRotation + 'deg)';
    // Typ B this.arrowrotation = 'translate(22px,106px) rotate(' + this.arrowRotation + 'deg)'; // links/Rects  rauf/runter 
//    this.arrowrotation = 'transform: translate(22px,106px) rotate(' + this.arrowRotation + 'deg) !important'; // links/Rects  rauf/runter 
    this.arrowrotation = 'transform: translate(0px,0px) rotate(' + this.arrowRotation + 'deg) !important'; // links/Rects  rauf/runter 
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
