import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebsocketServiceProvider } from '../../providers/websocket-service/websocket-service';
//import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  ipBackend: string;
  //myIpAddressSubject;
//  wssp = new WebsocketServiceProvider;

  constructor(public navCtrl: NavController, public wssp: WebsocketServiceProvider) {
    //this.myIpAddressSubject  = new Subject();
  }

  ipChanged(keycode) {
    if (keycode == 13) {  // ENTER pressed   
      this.wssp.setIp(this.ipBackend);  
      //console.log("About: sent new IP: " + this.ipBackend);
    }
  }

/*  public getIpSubject() {
//    return this.myIpAddressSubject;
  }
  */

}
 

