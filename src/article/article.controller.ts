import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ArticleModel } from './models/article.model';
import { FindArticleDto } from './dto/find-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { ARTICLE_NOT_FOUND } from './article.constants';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }
    @Get()
    async getAll() {
        this.articleService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const article = await this.articleService.findById(id);
        if (!article) {
            throw new HttpException(ARTICLE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return article
    }

    @Post('create')
    async create(@Body() dto: CreateArticleDto) {
        return this.articleService.create(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedArticle = await this.articleService.delete(id);
        if (!deletedArticle) {
            throw new HttpException(ARTICLE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: ArticleModel) {
        const updatedArticle = await this.articleService.update(id, dto);
        if (!updatedArticle) {
            throw new HttpException(ARTICLE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindArticleDto) {
        return this.articleService.find(dto);
    }

}
