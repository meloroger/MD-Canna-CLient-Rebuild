import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.css'],
})
export class LiveFeedComponent implements OnInit {
  message;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.message = this.http.get('/hello').subscribe(rsp => console.log(rsp));
  }
}
