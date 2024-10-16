import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty({
        example: 'test@gmail.com',
        description: 'User email',

    })
    @IsEmail()
    login: string;

    @ApiProperty({
        example: '123456',
        description: 'User password ',
    })
    @IsString()
    password: string;

}
