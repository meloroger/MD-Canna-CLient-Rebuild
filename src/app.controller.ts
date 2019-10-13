import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';
import { resolve } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sendApplication(@Res() response) {
    response.sendFile(resolve('../client-build/index.html'));
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
