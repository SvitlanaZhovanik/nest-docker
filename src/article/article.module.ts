import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModel, ArticleSchema } from './models/article.model';
import { ArticleService } from './article.service';

@Module({
  controllers: [ArticleController],
  imports: [
    MongooseModule.forFeature([{ name: ArticleModel.name, schema: ArticleSchema }])
  ],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule { }
