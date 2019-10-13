import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}
  getHello(): string {
    return 'Hello from Nest.js';
  }
}
