import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-item-chart',
  templateUrl: './item-chart.component.html',
  styleUrls: ['./item-chart.component.css']
})
export class ItemChartComponent implements OnInit {
  chart: Chart;

  ngOnInit() {
    this.loadChart();
  }

  loadChart(): void {
    this.chart = new Chart('bar', {
      type: 'bar',
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
          text: 'Combo Bar and line Chart'
        }
      },
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        datasets: [
          {
            type: 'bar',
            label: 'My First dataset',
            data: [243, 156, 365, 30, 156, 265, 356, 543],
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false
          },
          // {
          //   type: 'line',
          //   label: 'Dataset 2',
          //   backgroundColor: 'rgba(0,0,255,0.4)',
          //   borderColor: 'rgba(0,0,255,0.4)',
          //   data: [
          //     443, 256, 165, 100, 56, 65, 35, 543
          //   ],
          //   fill: true,
          // },
          {
            type: 'bar',
            label: 'My Second dataset',
            data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            fill: false
          }
        ]
      }
    });
  }
}
