import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    title: string;

    @IsUrl()
    link: string;

    @IsString()
    pubDate: string;

    @IsString()
    guid: string;

    @IsString()
    description: string;

    @IsUrl()
    @IsOptional()
    enclosureUrl: string;

    @IsString()
    @IsOptional()
    enclosureType: string;
}
