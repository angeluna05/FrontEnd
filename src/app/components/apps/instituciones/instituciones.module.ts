import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { BasicComponent } from './basic/basic.component';
import { TableComponentsComponent } from './table-components/table-components.component';
import { InstitucionesRoutingModule } from './instituciones-routing.module';
import { InstitucionesComponent } from './instituciones.component';

@NgModule({
  declarations: [
    BasicComponent,
    TableComponentsComponent,
    InstitucionesComponent,
  ],
  imports: [
    CommonModule,
    InstitucionesRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class InstitucionesModule { }