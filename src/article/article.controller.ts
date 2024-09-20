import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ArticleModel } from './models/article.model';
import { FindArticleDto } from './dto/find-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { ARTICLE_NOT_FOUND } from './article.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }
    @Get()
    async getAll() {
        return this.articleService.findAll();
    }

    @Get(':id')
    async getById(@Param('id', IdValidationPipe) id: string) {
        const article = await this.articleService.findById(id);
        if (!article) {
            throw new HttpException(ARTICLE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return article
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateArticleDto) {
        return this.articleService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedArticle = await this.articleService.deleteByID(id);
        if (!deletedArticle) {
            throw new HttpException(ARTICLE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @UsePipes(new ValidationPipe())
    @Patch(':id')
    async update(@Param('id', IdValidationPipe) id: string, @Body() dto: ArticleModel) {
        const updatedArticle = await this.articleService.updateByID(id, dto);
        if (!updatedArticle) {
            throw new HttpException(ARTICLE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return updatedArticle;
    }

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindArticleDto) {
        return this.articleService.find(dto);
    }

}
