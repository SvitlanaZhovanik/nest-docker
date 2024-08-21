import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<ArticleModel>;

@Schema()
export class ArticleModel {
    @Prop({ required: true, index: true, unique: true })
    _id: string;
    @Prop({ required: true })
    image: string;
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    description: string;
    @Prop({ type: [String] })
    categories: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleModel);
