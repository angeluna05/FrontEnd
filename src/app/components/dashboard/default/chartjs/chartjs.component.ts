import { Component, ViewEncapsulation } from '@angular/core';
import * as chartData from '../../../../shared/data/widget/chart';
import { OrderStatusComponent1 } from './../../../../shared/data/widget/chart';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartjsComponent {

  // Definir las propiedades que se usarán para la gráfica
  public barChartOptions = chartData.barChartOptions;
  public barChartLabels: string[] = []; // Etiquetas para la gráfica
  public barChartType = chartData.barChartType;
  public barChartLegend = chartData.barChartLegend;
  public barChartData: any[] = []; // Datos para la gráfica
  public barChartColors = chartData.barChartColors;

  constructor(private monthlyHistor: OrderStatusComponent1, private http: HttpClient) {}

  ngOnInit(): void {
    this.monthlyHistor.getJovenesMasActivos().subscribe((result) => {
      // Asignar los datos obtenidos a las propiedades de la gráfica
      this.barChartLabels = result.barChartLabelsGroup1.concat(result.barChartLabelsGroup2); // Concatenar las etiquetas de ambos grupos
      this.barChartData = result.barChartData; // Los datos de ambos grupos
    });
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

}
