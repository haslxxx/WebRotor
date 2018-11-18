import { Component } from '@angular/core';

/**
 * Generated class for the WebSockClientComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'web-sock-client',
  templateUrl: 'web-sock-client.html'
})
export class WebSockClientComponent {

  text: string;

  constructor() {
    console.log('Hello WebSockClientComponent Component');
    this.text = 'Hello World';
  }

}
