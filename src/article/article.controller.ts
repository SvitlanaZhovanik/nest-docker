import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { ARTICLE_NOT_FOUND, SORT_BY } from './article.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Article')
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Get()
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'per_page', required: false })
    @ApiQuery({ name: 'search', required: false })
    @ApiQuery({ name: 'sort_by', required: false, enum: SORT_BY })
    @ApiOkResponse({ description: 'List of articles or []' })
    async getAll(@Query('page') page: number, @Query('per_page') per_page: number, @Query('search') search: string, @Query('sort_by') sort_by: string) {
        const limit = per_page || 10;
        const text = search || '';
        const sortBy = sort_by as SORT_BY;
        const data = await this.articleService.findAll(page = 1, limit, text, sortBy);
        const total = await this.articleService.countArticles(text);
        return {
            data,
            meta: {
                total,
                page,
                per_page: limit,
                total_pages: Math.ceil(total / limit)
            }
        }
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Article by id' })
    @ApiBadRequestResponse({ description: ARTICLE_NOT_FOUND })
    async getById(@Param('id', IdValidationPipe) id: string) {
        const article = await this.articleService.findById(id);
        if (!article) {
            throw new HttpException(ARTICLE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return article
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    @ApiBody({ type: CreateArticleDto })
    @ApiCreatedResponse({ description: 'Article created' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async create(@Body() dto: CreateArticleDto) {
        return this.articleService.create(dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBadRequestResponse({ description: ARTICLE_NOT_FOUND })
    @ApiOkResponse({ description: 'Article deleted' })
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedArticle = await this.articleService.deleteByID(id);
        if (!deletedArticle) {
            throw new HttpException(ARTICLE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @UsePipes(new ValidationPipe())
    @Patch(':id')
    @ApiBody({ type: CreateArticleDto })
    @ApiBadRequestResponse({ description: ARTICLE_NOT_FOUND })
    @ApiOkResponse({ description: 'Article updated' })
    async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateArticleDto) {
        const updatedArticle = await this.articleService.updateByID(id, dto);
        if (!updatedArticle) {
            throw new HttpException(ARTICLE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return updatedArticle;
    }

}
