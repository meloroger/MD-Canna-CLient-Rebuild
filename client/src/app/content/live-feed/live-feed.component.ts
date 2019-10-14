import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.css'],
})
export class LiveFeedComponent implements OnInit {
  message;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.message = this.http
      .get('/hello', { headers })
      .subscribe(rsp => console.log(rsp));
  }
}
