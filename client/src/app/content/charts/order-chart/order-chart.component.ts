import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { OrderData } from 'src/app/dto/order-data.interface';
import { DataLauncher } from 'src/app/launcher/data.launcher';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-chart',
  templateUrl: './order-chart.component.html',
  styleUrls: ['./order-chart.component.css']
})
export class OrderChartComponent implements OnInit {
  chart: Chart;
  orderChartVM$: Observable<OrderData>;

  constructor(private readonly dataLauncher: DataLauncher) {}

  ngOnInit() {
    this.orderChartVM$ = this.dataLauncher.orderData$.pipe(
      map(data => {
        console.log(data);
        if (data !== null) {
          this.updateData(data);
        }

        return data;
      })
    );
    this.loadChart();
  }

  loadChart(): void {
    this.chart = new Chart('line', {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        title: {
          display: true,
          text: 'Orders Processed'
        },
        legend: {
          position: 'top'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      },
      data: {
        datasets: [
          {
            data: [0, 1, 2, 0],
            backgroundColor: ['blue'],
            borderColor: 'blue',
            label: 'Total Orders',
            fill: false
          },
          {
            data: [0, 5, 15, 0],
            backgroundColor: ['green'],
            borderColor: 'green',
            label: 'Total Quantity',
            fill: false
          }
        ],
        labels: ['', '', '', '']
      }
    });
  }

  private updateData(data: OrderData): void {
    this.chart.data.datasets[0].data.shift();
    this.chart.data.datasets[0].data.push(data.totalQty);

    this.chart.data.datasets[1].data.shift();
    this.chart.data.datasets[1].data.push(data.totalOrders);

    this.chart.update();
  }
}
