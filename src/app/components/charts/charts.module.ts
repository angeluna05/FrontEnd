import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartistModule } from 'ng-chartist';
import { NgChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { SharedModule } from '../../shared/shared.module';
import { ChartsRoutingModule } from './charts-routing.module';

import { ChartistComponent } from './chartist/chartist.component';
import { GoogleComponent } from './google/google.component';

@NgModule({
  declarations: [GoogleComponent, ChartistComponent,],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    Ng2GoogleChartsModule,
    NgChartsModule,
    ChartistModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ChartModule { }
