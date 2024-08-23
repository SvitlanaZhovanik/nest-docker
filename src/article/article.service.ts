import { Injectable } from '@nestjs/common';
import { ArticleModel } from './models/article.model';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArticleService {
    constructor(@InjectModel(ArticleModel.name) private readonly articleModel: Model<ArticleModel>) { }

    async create(dto: CreateArticleDto): Promise<ArticleModel> {
        return this.articleModel.create(dto);
    }

    async findAll(): Promise<ArticleModel[]> {
        return this.articleModel.find().exec();
    }

    async findById(id: string): Promise<ArticleModel> | null {
        return this.articleModel.findById(id).exec();
    }

    async update(id: string, dto: CreateArticleDto): Promise<ArticleModel> | null {
        return this.articleModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async delete(id: string): Promise<ArticleModel> | null {
        return this.articleModel.findByIdAndDelete(id).exec();
    }

    async find(dto: any): Promise<ArticleModel[]> {
        return this.articleModel.find(dto).exec();
    }
}
