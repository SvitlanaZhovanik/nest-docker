import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Parser from 'rss-parser';
import { ArticleService } from 'src/article/article.service';
import { RSS_PARSER_ERROR } from './rss-parser.constants';

@Injectable()
export class RssParserService {
    private url: string;
    private parser: Parser

    constructor(private readonly configService: ConfigService,
        private readonly articleService: ArticleService
    ) {
        this.url = this.configService.get('RSS_URL') || '';
        this.parser = new Parser();

    }


    async parseRSSFeed() {
        try {
            const feed = await this.parser.parseURL(this.url);
            const promises = feed.items.map(async item => {
                const {
                    title,
                    contentSnippet,
                    link,
                    pubDate,
                    guid,
                    enclosure = { url: '', type: '' },
                } = item;

                const existingArticle = await this.articleService.findByLink(link);
                if (!existingArticle) {
                    return this.articleService.create({
                        title,
                        description: contentSnippet,
                        link,
                        pubDate,
                        guid,
                        enclosureUrl: enclosure?.url,
                        enclosureType: enclosure?.type
                    });
                }
            });
            await Promise.all(promises);
        } catch (error) {
            throw new HttpException(RSS_PARSER_ERROR, HttpStatus.NOT_FOUND);
        }
    }


}
