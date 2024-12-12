import { JovenesRoutingModule } from './jovenes-routing.module';
import { JovenesComponent } from './jovenes.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { BasicComponent } from './basic/basic.component';
import { TableComponentsComponent } from './table-components/table-components.component';


@NgModule({
  declarations: [
    BasicComponent,
    TableComponentsComponent,
    JovenesComponent,
  ],
  imports: [
    CommonModule,
    JovenesRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class JovenesModule { }
