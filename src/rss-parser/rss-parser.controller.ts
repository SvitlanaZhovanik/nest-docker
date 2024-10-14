import { Controller } from '@nestjs/common';
import { RssParserService } from './rss-parser.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('rss-parser')
export class RssParserController {
    constructor(private readonly rssParserService: RssParserService) { }

    @Cron(CronExpression.EVERY_HOUR)
    async parse() {
        await this.rssParserService.parseRSSFeed();
    }

}
