import { IsString, IsArray, IsOptional, } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    image: string;
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categories?: string[];
}
