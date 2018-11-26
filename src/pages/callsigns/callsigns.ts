import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider, Callsign } from '../../providers/storage/storage';


@IonicPage()
@Component({
  selector: 'page-callsigns',
  templateUrl: 'callsigns.html',
})
export class CallsignsPage {

  callsigns: Array<Callsign>;
  callToEdit: Callsign = {call:"", bearing:"",remark:""};
  show: boolean = false;      // controls html appearence
  isNewItem: boolean = false;  //distinguish between add and edit

//  constructor(public navCtrl: NavController, public storage: StorageProvider, public windrosePage: WindrosePage) {
  constructor(public navCtrl: NavController, public storage: StorageProvider) {
      console.log("Hi CallsignPage (CSP)");
    this.getCallsignData();
    this.subscribeSubjects(); 
    this.initCallToEdit();
  }

  ionViewDidLoad() {
    console.log('CSP: ionViewDidLoad CallsignsPage');
  }

  initCallToEdit() {
    this.callToEdit.call = "111";
    this.callToEdit.bearing = "222";
    this.callToEdit.remark = "333";
  }


  getCallsignData() {
    this.callsigns = this.storage.getCallArray();
    console.log("CallsignData "  + this.callsigns);  // !! asynchron daten  --> observable nötig !!!
  }

  newClicked() {
    console.log("CSP: new clicked");
    this.show = true;
    this.initCallToEdit();
    this.isNewItem = true;
  }

  callSelected($event, callsign) {
    console.log("CSP: Call selected");
//    this.windrosePage.setGotoStationBearing(callsign.bearing);
    
  }

  callEdit(callsign) {
    console.log("CSP: edit clicked: " + callsign.call);
    this.callToEdit = callsign;
    this.show = true;
    this.isNewItem = false;
  }

  callDelete(callsign) {
    console.log("CSP: delete clicked");
    this.storage.deleteCall(callsign);
  }

  discardEntryClicked() {
    console.log("CSP: discard clicked");
    this.show = false;
    this.initCallToEdit();

//    this.storage.restoreCallsigns(); //// NUR TEST  muss wieder raus
  }

  saveClicked(callsign) {
    console.log("CSP: save clicked " + callsign.call);
//    this.callsigns.push({call: callsign.call, bearing: callsign.bearing, remark:callsign.remark});
//    this.storage.saveCall(callsign, this.isNewItem);
    if (this.isNewItem) {
//      this.storage.saveCall(callsign, this.isNewItem); 
      this.storage.saveCall({call: callsign.call, bearing: callsign.bearing, remark:callsign.remark}, this.isNewItem); // pass new Object w/ object data
    } else {
      this.storage.saveCall(callsign, this.isNewItem); //pass on Object (for deleting old version)
    }    
    this.show = false;
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

  callsignsSubject; 
  subscribeSubjects() { //Subject ist das praktischere Observable
    this.callsignsSubject = this.storage.getCallsignSubject();
    this.callsignsSubject.subscribe((dataArray) => { 
      this.callsigns = dataArray;
      console.log("CSP: CallsignData from Subject "  + this.callsigns);
    });
  }

  

}
