import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `

    <div id="windrose">
    <!--
      <img id="arrow" src="../../assets/imgs/PfeilUmrissRot.gif" [ngStyle]="{'transform': transform}">
      -->
    </div>

    <!-- for tests only -- can be removed! -- BEGIN -->
    <p class="testbutton">
      <button class="testbutton" (click)="changeValue()">Change value</button>
    </p>
    <p>
      {{_value}}
    </p>
    <!-- END -->

  `
  /*
  ,
  styles: [`
    #windrose {
      height: 300px;
      width: 300px;
      border: 1px solid black;
      background-image: url("../../assets/imgs/Windrose.png");      
      background-size: 100% 100%;
      background-color: white;
    }
    
    #arrow {
      height: 300px;
      width: 300px;
      opacity: 0.5;
    }
  `]
*/
})
export class WindroseTestComponent {
  private _value = 0; 
  transform = 'rotate(0deg)';

  set value(value: number) {
    this._value = value;
    this.transform = `rotate(${value}deg)`;
  }

  get value() {
    return this._value;
  }

  // for tests only -- can be removed! -- BEGIN
  changeValue() {
    this.value += 10 % 360;
  }
  // END
}
