import { Controller, Get, Post, Body } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('search')
  async search(
    @Body()
    searchParams: {
      locale: string;
      frequency: string;
      keywords: string;
    },
  ): Promise<object[]> {
    try {
      const searchResult = await this.appService.callGoBot(searchParams);

      await this.appService.saveSearchResults(
        searchResult,
        searchParams.keywords,
      );

      return searchResult;
    } catch (error) {
      throw new HttpException(
        'Error while searching',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  async getAllSearches(): Promise<object[]> {
    try {
      const searches = await this.appService.getAllSearches();
      return searches;
    } catch (error) {
      throw new HttpException(
        'Error while retrieving searches',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
