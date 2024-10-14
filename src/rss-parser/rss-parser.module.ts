import { Module } from '@nestjs/common';
import { RssParserService } from './rss-parser.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ArticleModule } from 'src/article/article.module';
import { RssParserController } from './rss-parser.controller';

@Module({
  providers: [RssParserService],
  imports: [ConfigModule, ArticleModule],
  controllers: [RssParserController],
})
export class RssParserModule { }
