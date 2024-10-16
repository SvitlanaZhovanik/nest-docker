import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional } from 'class-validator';


export class CreateArticleDto {
    @ApiProperty({
        example: 'Article title',
        description: 'Article title',
    })
    @IsString()
    title: string;

    @ApiProperty({
        example: 'https://www.example.com',
        description: 'Article link. Must be unique',
    })
    @IsUrl()
    link: string;

    @ApiProperty({
        example: 'Mon, 01 Jan 2021 00:00:00 GMT',
        description: 'Article publication date',
    })
    @IsString()
    pubDate: string;

    @ApiProperty({
        example: 'https://www.example.com',
        description: 'Article source',
    })
    @IsString()
    guid: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,vestibulum nunc. Integer sit amet odio sit amet lectus luctus mollis.Nullam non nisl nec justo.',
        description: 'Article description',
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: 'https://www.example.com/image.jpg',
        description: 'Enclosure url',
        required: false,
    })
    @IsUrl()
    @IsOptional()
    enclosureUrl: string;

    @ApiProperty({
        example: 'image/jpeg',
        description: 'Enclosure type',
        required: false,
    })
    @IsString()
    @IsOptional()
    enclosureType: string;
}
