import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { BasicComponent } from './basic/basic.component';
import { TableComponentsComponent } from './table-components/table-components.component';
import { RetosRoutingModule } from './retos-routing.module';
import { RetosComponent } from './retos.component';

@NgModule({
  declarations: [
    BasicComponent,
    TableComponentsComponent,
    RetosComponent,
  ],
  imports: [
    CommonModule,
    RetosRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgSelectModule,
  ]
})
export class RetosModule { }