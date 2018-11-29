import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { WebsocketServiceProvider } from '../../providers/websocket-service/websocket-service';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  ipBackend: string;
//  @Output('newip')   newIp = new EventEmitter();  
  //myIpAddressSubject;
//  wssp = new WebsocketServiceProvider;

  constructor(public navCtrl: NavController) {
//    constructor(public navCtrl: NavController, public wssp: WebsocketServiceProvider) {
      //this.myIpAddressSubject  = new Subject();
  }

  ipChanged(keycode) {
    if (keycode == 13) {  // ENTER pressed   
    //  this.wssp.setIp(this.ipBackend);  
//      this.newIp.emit(this.ipBackend);  //emit ip address //subscriben by websocket service
      console.log("About: sent new IP: " + this.ipBackend);
    }
  }

/*  public getIpSubject() {
//    return this.myIpAddressSubject;
  }
  */

}
 

