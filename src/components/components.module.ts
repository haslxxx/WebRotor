/*
import { NgModule } from '@angular/core';
import { WindroseTestComponent } from './windrose-test/windrose-test';
@NgModule({
	declarations: [WindroseTestComponent],
	imports: [],
	exports: [WindroseTestComponent]
})
export class ComponentsModule {}
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppComponent } from './app.component';
import { WindroseTestComponent } from './windrose-test/windrose-test';

@NgModule({
  declarations: [
    WindroseTestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [WindroseTestComponent]
})
export class AppModule { }
