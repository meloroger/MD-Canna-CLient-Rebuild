import { Controller, Get, Res, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { resolve } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  sendApplication(@Res() response) {
    return {
      message: response.sendFile(resolve('../client-build/index.html')),
    };
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
