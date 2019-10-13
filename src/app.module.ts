import { Module, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
