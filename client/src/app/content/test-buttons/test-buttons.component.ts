import { Component, OnDestroy } from '@angular/core';
import { TestService } from 'src/app/performance/test.service';

@Component({
  selector: 'app-test-buttons',
  templateUrl: './test-buttons.component.html',
  styleUrls: ['./test-buttons.component.css']
})
export class TestButtonsComponent implements OnDestroy {
  submit10Sent = 0;
  submit10Completed = 0;
  submit100Sent = 0;
  submit100Completed = 0;
  submit1000Sent = 0;
  submit1000Completed = 0;
  submit10000Sent = 0;
  submit10000Completed = 0;

  constructor(private readonly testService: TestService) {}

  ngOnDestroy() {}

  submit10() {
    for (let i = 1; i <= 10; i++) {
      this.submit10Sent = i;
      this.testService.sendTestOrder().subscribe(() => {
        this.submit10Completed = this.submit10Completed + 1;
      });
    }
  }

  submit100() {
    for (let i = 1; i <= 100; i++) {
      this.submit100Sent = i;
      this.testService.sendTestOrder().subscribe(() => {
        this.submit100Completed = this.submit100Completed + 1;
      });
    }
  }

  submit1000() {
    for (let i = 1; i <= 1000; i++) {
      this.submit1000Sent = i;
      this.testService.sendTestOrder().subscribe(() => {
        this.submit1000Completed = this.submit1000Completed + 1;
      });
    }
  }

  submit10000() {
    for (let i = 1; i <= 10000; i++) {
      this.submit10000Sent = i;
      this.testService.sendTestOrder().subscribe(() => {
        this.submit10000Completed = this.submit10000Completed + 1;
      });
    }
  }

  clearOrders(): void {
    this.testService.clearOrders();
  }
}
