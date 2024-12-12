import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { BasicComponent } from '../../table/bootstrap-tables/basic/basic.component';
import { TableComponentsComponent } from '../../table/bootstrap-tables/table-components/table-components.component';
import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './empresas.component';

@NgModule({
  declarations: [
    BasicComponent,
    TableComponentsComponent,
    EmpresasComponent,
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgSelectModule,
  ]
})
export class EmpresasModule { }
