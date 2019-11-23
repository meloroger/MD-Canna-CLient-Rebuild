import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Chart } from 'chart.js';
import { DataLauncher } from 'src/app/launcher/data.launcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemData } from 'src/app/dto/item-data.interface';

@Component({
  selector: 'app-item-chart',
  templateUrl: './item-chart.component.html',
  styleUrls: ['./item-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemChartComponent implements OnInit {
  chart: Chart;
  itemChartVM$: Observable<ItemData[]>;

  constructor(private readonly dataLauncher: DataLauncher) {}

  ngOnInit() {
    this.itemChartVM$ = this.dataLauncher.itemData$.pipe(
      map(data => {
        console.log(data);
        if (data.length > 0) {
          this.updateData(data);
        }
        return data;
      })
    );
    this.loadChart();
  }

  loadChart(): void {
    this.chart = new Chart('bar', {
      type: 'bar',
      options: {
        animation: false,
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
          text: 'Item Availability'
        }
      },
      data: {
        labels: ['ITEMS'],
        datasets: [
          {
            type: 'bar',
            label: '',
            data: [300],
            backgroundColor: `rgba(0, 0, 255, 0.4)`,
            borderColor: 'rgba(0, 0, 0, 0.9)',
            fill: false
          },
          {
            type: 'bar',
            label: '',
            data: [200],
            backgroundColor: `rgba(255, 0, 255, 0.4)`,
            borderColor: 'rgba(0, 0, 0, 0.9)',
            fill: false
          },
          {
            type: 'bar',
            label: '',
            data: [100],
            backgroundColor: `rgba(0, 0, 255, 0.4)`,
            borderColor: 'rgba(0, 0, 0, 0.9)',
            fill: false
          }
        ]
      }
    });
  }

  private updateData(itemData: ItemData[]): void {
    this.chart.data.datasets = this.addData(itemData);

    this.chart.update();
  }

  private addData(itemData: ItemData[]): object[] {
    return itemData.map(item => {
      const random = () => Math.floor(Math.random() * 255);
      return {
        type: 'bar',
        label: item.name,
        data: [item.quantity],
        backgroundColor: `rgba(${random()}, ${random()}, ${random()}, 0.4)`,
        borderColor: 'rgba(0, 0, 0, 0.9)',
        fill: false
      };
    });
  }
}
