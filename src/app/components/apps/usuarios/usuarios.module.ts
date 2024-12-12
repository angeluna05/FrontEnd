import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { BasicComponent } from '../../table/bootstrap-tables/basic/basic.component';
import { TableComponentsComponent } from '../../table/bootstrap-tables/table-components/table-components.component';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';




@NgModule({
  declarations: [

    UsuariosComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class UsuariosModule { }