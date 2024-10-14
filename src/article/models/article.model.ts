import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type ArticleDocument = HydratedDocument<ArticleModel>;

@Schema({ timestamps: true, versionKey: false })
export class ArticleModel {
    _id: ObjectId;

    @Prop({ nullable: true })
    enclosureUrl: string;

    @Prop({ nullable: true })
    enclosureType: string;

    @Prop({ required: true, text: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, unique: true })
    link: string;

    @Prop({ required: true })
    guid: string;

    @Prop({ required: true })
    pubDate: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleModel);
