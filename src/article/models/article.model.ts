import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type ArticleDocument = HydratedDocument<ArticleModel>;

@Schema()
export class ArticleModel {
    _id: ObjectId;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true, text: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String] })
    categories: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleModel);
