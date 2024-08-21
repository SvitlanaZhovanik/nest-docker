import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModel, ArticleSchema } from './models/article.model';

@Module({
  controllers: [ArticleController],
  imports: [
    MongooseModule.forFeature([{ name: ArticleModel.name, schema: ArticleSchema }])
  ]
})
export class ArticleModule { }
