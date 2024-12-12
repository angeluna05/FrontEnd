import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SharedModule } from '../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { BasicComponent } from './basic/basic.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableComponentsComponent } from './table-components/table-components.component';
import { ProgramarSesionesComponent } from './programar-sesiones.component';
import { ProgramarSesionesRoutingModule } from './programar-sesiones-routing.module';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    BasicComponent,
    TableComponentsComponent,
    ProgramarSesionesComponent,
  ],
  imports: [
    CommonModule,
    ProgramarSesionesRoutingModule,
    FormsModule,
    NgbTimepickerModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgSelectModule,
    MatRadioModule,
    MatPaginatorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule.forRoot()
  ]
})
export class programarSesionesModule { }