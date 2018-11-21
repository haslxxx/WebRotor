import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WindrosePage } from './windrose';

@NgModule({
  declarations: [
    WindrosePage,
  ],
  imports: [
    IonicPageModule.forChild(WindrosePage),
  ],
})
export class WindrosePageModule {}
