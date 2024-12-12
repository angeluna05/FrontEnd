import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SharedModule } from '../../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { BasicComponent } from './basic/basic.component';
import { TableComponentsComponent } from './table-components/table-components.component';
import { SesionesRoutingModule } from './sesiones-routing.module';
import { SesionesComponent } from './sesiones.component';



@NgModule({
  declarations: [
    BasicComponent,
    TableComponentsComponent,
    SesionesComponent,
  ],
  imports: [
    CommonModule,
    SesionesRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgSelectModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule.forRoot()
  ]
})
export class SesionesModule { }