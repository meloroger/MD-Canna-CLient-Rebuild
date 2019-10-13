import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  activeUrl: string;
  constructor(private router: Router, private ngZone: NgZone) {}

  ngOnInit() {
    this.activeUrl = this.router.url;
  }

  activate(): void {}
}
