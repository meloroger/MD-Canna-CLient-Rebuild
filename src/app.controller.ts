import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sendApplication(@Res() response): Observable<any> {
    return response.sendFile('index.html');
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
