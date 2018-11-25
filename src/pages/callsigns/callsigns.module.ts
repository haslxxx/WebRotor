import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallsignsPage } from './callsigns';

@NgModule({
  declarations: [
    CallsignsPage,
  ],
  imports: [
    IonicPageModule.forChild(CallsignsPage),
  ],
})
export class CallsignsPageModule {}
