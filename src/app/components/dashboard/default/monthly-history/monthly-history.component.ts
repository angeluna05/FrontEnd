import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/widget/chart'
import { OrderStatusComponent1 } from './../../../../shared/data/widget/chart';

@Component({
  selector: 'app-monthly-history',
  templateUrl: './monthly-history.component.html',
  styleUrls: ['./monthly-history.component.scss']
})
export class MonthlyHistoryComponent {
  constructor(private monthlyHistor: OrderStatusComponent1) {}

  ngOnInit(): void {
    this.monthlyHistor.actualizarGraph(); // Llamar el método para obtener datos
  }
  public monthlyHistory = chartData.monthlyHistory
}
