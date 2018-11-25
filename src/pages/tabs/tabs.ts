import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
//import { MainPage } from '../main/main';
import { WindrosePage } from '../windrose/windrose';
import { CallsignsPage } from '../callsigns/callsigns';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

//  tab1Root = AboutPage;
  tab1Root = WindrosePage;
  tab2Root = HomePage;
  tab3Root = AboutPage;
  tab4root = CallsignsPage;
  tab5root = ContactPage;

  constructor() {

  }
}
