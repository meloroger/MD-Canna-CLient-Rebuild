import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-order-chart',
  templateUrl: './order-chart.component.html',
  styleUrls: ['./order-chart.component.css'],
})
export class OrderChartComponent implements OnInit {
  chart;
  constructor() {}

  ngOnInit() {
    this.loadChart();
  }

  loadChart(): void {
    this.chart = new Chart('doughnut', {
      type: 'doughnut',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        title: {
          display: true,
          text: 'Doughnut Chart',
        },
        legend: {
          position: 'top',
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
      data: {
        datasets: [
          {
            data: [45, 10, 5, 25, 15],
            backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
            label: 'Dataset 1',
          },
        ],
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      },
    });
  }
}
