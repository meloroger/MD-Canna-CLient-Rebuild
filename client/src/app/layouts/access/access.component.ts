import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {
  sidebar: boolean;
  constructor() {}

  ngOnInit() {}

  toggleSideMenu(menu: boolean) {
    this.sidebar = menu;
  }
}
