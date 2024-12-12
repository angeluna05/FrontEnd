import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { BasicComponent } from './bootstrap-tables/basic/basic.component';
import { TableComponentsComponent } from './bootstrap-tables/table-components/table-components.component';
import { TableRoutingModule } from './table-routing.module';

@NgModule({
  declarations: [
    BasicComponent,
    TableComponentsComponent,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class TableModule { }
