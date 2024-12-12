import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { BasicComponent } from './basic/basic.component';
import { TableComponentsComponent } from './table-components/table-components.component';
import { LogrosRoutingModule } from './logros-routing.module';
import { LogrosComponent } from './logros.component';

@NgModule({
  declarations: [
    BasicComponent,
    TableComponentsComponent,
    LogrosComponent,
  ],
  imports: [
    CommonModule,
    LogrosRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgSelectModule,
  ]
})
export class LogrosModule { }