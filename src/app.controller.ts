import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  @ApiResponse({ status: 200, description: 'Hi! This is API for the news about cats' })
  getHello(): string {
    return this.appService.getHello();
  }
}
