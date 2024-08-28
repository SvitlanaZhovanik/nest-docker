import { IsString, IsArray, } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    image: string;
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsArray()
    categories: string[];
}
