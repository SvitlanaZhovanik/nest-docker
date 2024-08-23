import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type AuthDocument = HydratedDocument<ArticleModel>;

@Schema()
export class ArticleModel {
    @Prop()
    _id: ObjectId;
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
