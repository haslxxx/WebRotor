import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';   
import {Subject} from 'rxjs/Subject';

export interface RotorParam {  //statt interface könnte man auch class schreiben
  par1: number;
  par2: string;
  par3: string;
}

export interface Callsign {
  call: string;
  bearing: string;
  remark: string;
}


@Injectable()
export class StorageProvider {

  rotorData: {RotorParam};
  callsigns: Array<Callsign>;
  callsignsSubject: Subject<Array<Callsign>>;

  mockCallsignData: Array <Callsign> 
    = Array(
      { call: "OE1FFS", bearing: "150", remark: "His Repeaters Master" } ,
      { call: "OE3KAB", bearing: "45", remark: "Mein bester Nachbar" }, 
      { call: "OE5VRL", bearing: "270", remark: "Der Herr Microwelle" }
  );

  constructor (private storage: Storage ) {
    console.log('Hi StorageProvider (STG)');
    this.callsignsSubject = new Subject();
    this.restoreCallsigns();
  }

  public getCallArray() {
    return this.callsigns;
  }

  public saveCall(call, isNewItem){   
    if (!isNewItem) {  //update of an existing item
      this.callsigns = this.callsigns.filter(item => item !== call); // extract item , otherwise it's double
    }
    this.callsigns.push(call);   
    this.storeCallsigns(this.callsigns);
  }

  public deleteCall(call) {
    this.callsigns = this.callsigns.filter(item => item !== call); // extract item 
//    console.log("STG: Reduced callsigns " + this.callsigns);
    this.storeCallsigns(this.callsigns);
  }

  storeCallsigns(callsignArray) { //schreibt alle daten neu ins storage
    console.log("STG: Storing callsigns " + callsignArray);
    this.storage.set('callsigns', callsignArray)
    .then(() => { 
      this.callsignsSubject.next(this.callsigns);  // Observable update
    });
  }

  restoreCallsigns() {
    this.storage.length().then((val) => { 
      console.log("STG: Callsigns Storage Length" );
      console.log(val);    
      if (val == 0)  { //Keine einträge --> neu anlegen  
        console.log("STG: Empty List !!)");
        this.storage.set('callsigns', this.mockCallsignData); // Wenn leer dann mit Dummydaten füllen
      } else {
        this.storage.get('callsigns').then((arrayData) => { //key value pair holen 
          if (arrayData == null) { //Keine einträge --> neu anlegen 
            console.log("STG: No Callsign data");
            this.storage.set('callsigns', this.mockCallsignData); // Wenn leer dann mit Dummydaten füllen
          } else {
            console.log("STG: Found Local callsign data " + arrayData); // HURRA Daten sind vorhanden
            // Daten  ins lokale ARRAY kopieren
            this.callsigns = arrayData;
            this.callsignsSubject.next(this.callsigns);  // feed Observable
          } 
        });   
      };
    })  
  }

  public getCallsignSubject() {
    return this.callsignsSubject;
  }

}
