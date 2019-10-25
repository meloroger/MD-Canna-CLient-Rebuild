import { Component, OnInit } from '@angular/core';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private streamService: StreamService) {}

  ngOnInit() {}
}
