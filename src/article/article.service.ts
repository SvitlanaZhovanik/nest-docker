import { Injectable } from '@nestjs/common';
import { ArticleModel } from './models/article.model';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SORT_BY } from './article.constants';
import { sortByOptions } from './article.utils';

@Injectable()
export class ArticleService {
    constructor(@InjectModel(ArticleModel.name) private readonly articleModel: Model<ArticleModel>) { }

    async create(dto: CreateArticleDto): Promise<ArticleModel> {
        return this.articleModel.create(dto);
    }

    async findAll(page: number, limit: number, text: string, sortBy: SORT_BY): Promise<ArticleModel[]> {
        const skip = (page - 1) * limit;
        const query = text ? { $text: { $search: text, $caseSensitive: false } } : {};
        const sort = sortByOptions(sortBy);

        return this.articleModel.find(query).skip(skip).limit(limit).sort(sort).exec();
    }

    async countArticles(text: string): Promise<number> {
        const query = text ? { $text: { $search: text, $caseSensitive: false } } : {};
        return this.articleModel.countDocuments(query).exec();
    }


    async findById(id: string): Promise<ArticleModel> | null {
        return this.articleModel.findById(id).exec();
    }

    async updateByID(id: string, dto: CreateArticleDto): Promise<ArticleModel> | null {
        return this.articleModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async deleteByID(id: string): Promise<ArticleModel> | null {
        return this.articleModel.findByIdAndDelete(id).exec();
    }

    async findByLink(link: string): Promise<ArticleModel> {
        return this.articleModel.findOne({ link }).exec();
    }
}
