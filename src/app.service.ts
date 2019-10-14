import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}
  getHello() {
    return { message: 'Hello from Nest.js' };
  }
}
