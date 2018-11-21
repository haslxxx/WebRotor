import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { WebsocketServiceProvider } from '../../providers/websocket-service/websocket-service';

import { Observer } from 'observer';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  jsonX: string;
  onButtonON: boolean = true;
  remoteChecked: boolean = false;
  motorSpeed: number = 100;
  position: String = "0";

  testhtml: string = '<div> das ist ein inner html text   </div>';
  scripthtml: string = '<div> script <script>var testorello = "scripttest variable";  </script> </div>';

  html: string = ' <div id="donutchart" style="width: 900px; height: 500px;"></div>  ';
  head: string = ' \
  <script type="text/javascript" src="../../assets/js/loader.js"></script>\
  <script type="text/javascript">\
    google.charts.load("current", {packages:["corechart"]});\
    google.charts.setOnLoadCallback(drawChart);\
    function drawChart() {\
      var data = google.visualization.arrayToDataTable([\
        [\'Task\', \'Hours per Day\'],\
        [\'Work\',     11],\
        [\'Eat\',      2],\
        [\'Commute\',  2],\
        [\'Watch TV\', 2],\
        [\'Sleep\',    7]\
      ]);\
      \
      var options = {\
        title: \'My Daily Activities\',\
        pieHole: 0.5,\
      };\
      \
      var chart = new google.visualization.PieChart(document.getElementById(\'donutchart\'));\
      chart.draw(data, options);\
    }\
  </script>\
';
  
  wsp = new WebsocketServiceProvider();

  constructor(public navCtrl: NavController) {
    this.subscribeSubjects(); // ein Observer pattern
    //this.aBitJavaScript();
    this.loadChart();
  }

  loadChart() {
   // google.charts.load("current", {packages:["corechart"]});  tschinn bumm krach
  }

  sendButtonClicked() {
    console.log ("Send Clicked " + this.jsonX);
    //this.sendMessage(this.jsonX);
    this.wsp.sendMessage(this.jsonX);
  }

  onButtonClicked() {
    console.log("ON: " + this.onButtonON);
    if (this.onButtonON) { // switch on websocket connection
      this.wsp.openWebSocket();
    } else {
      this.wsp.closeWebSocket();
    }
  }

  onRemoteChange() {
    console.log("remote: " + this.remoteChecked);
  }

  motorSpeedChange() {
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"M\",\"val\":\"" + this.motorSpeed    + "\"}" );
  }

  leftButtonClicked() {  
    this.motorSpeedChange();
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"L\"}");
  }
  rightButtonClicked() {
    this.motorSpeedChange();
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"R\"}");
  }
  stopButtonClicked() {  
    this.wsp.sendMessage("{\"cmd\":\"ROTOR\",\"funct\":\"S\"}");
  }

  setPosition(pos) {
    this.position = pos;
  }

  setOnButton(val) {
    this.onButtonON = val;
  }

  //################################ OBSERVER####################
  /*  ..... geht so nicht ??  :-(
  establishObservable() {
    var observbl: Observable = this.wsp.getObserverObject;
    observbl.subscribe((data) => {console.log(data);} )
  }
*/
  myPositionSubject; 
  myOnButtonSubject;
  subscribeSubjects() { //das praktischere Observable
    this.myPositionSubject = this.wsp.getPositionSubject();
    this.myPositionSubject.subscribe((data) => { 
      this.setPosition(data);
    });

    this.myOnButtonSubject = this.wsp.getWsOpenSubject();
    this.myOnButtonSubject.subscribe((data) => { 
      this.setOnButton(data);
    });
  }


/*
  aBitJavaScript() {
    $1("#knobcontainer").timerangewheel({
      indicatorWidth: 12,
      handleRadius: 15,
      handleStrokeWidth: 1,
      accentColor: '#fed766',
      handleIconColor: "#8a9097",
      handleStrokeColor: "#8a9097",
      handleFillColorStart: "#374149",
      handleFillColorEnd: "#374149",
      tickColor: "#8a9097",
      indicatorBackgroundColor: "#8a9097",
      data: {"start":"19:10", "end":"02:00"},
      onChange: function (timeObj) {
        $1(".graph-left").html("Start: "+timeObj.start);
        $1(".graph-right").html("End: "+timeObj.end);
        $1(".graph-center").html("Duration: "+timeObj.duration);
      }
    });
  }
*/



} // end Class




