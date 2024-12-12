import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalenderComponent } from './calender.component';
import { CalenderRoutingModule } from './calender-routing.module';

@NgModule({
  declarations: [
    CalenderComponent
  ],
  imports: [
    CalenderRoutingModule,
    BrowserModule,
    FullCalendarModule // register FullCalendar with your app
  ],
  providers: [],
  bootstrap: [CalenderComponent]
})

export class CalenderModule { }