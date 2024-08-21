import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ArticleModel } from './models/article.model';
import { FindArticleDto } from './dto/find-article.dto';

@Controller('article')
export class ArticleController {

    @Get()
    async getAll() {

    }

    @Get(':id')
    async getById(@Param('id') id: string) {

    }

    @Post('create')
    async create(@Body() dto: Omit<ArticleModel, '_id'>) {

    }

    @Delete(':id')
    async delete(@Param('id') id: string) {

    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: ArticleModel) {

    }

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindArticleDto) {

    }

}
