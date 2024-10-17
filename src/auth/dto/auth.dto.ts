import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty({
        example: 'test@gmail.com',
        description: 'User email',

    })
    @IsEmail()
    login: string;

    @ApiProperty({
        example: 'Qwerty123',
        description: 'User password. Need to contain at least 6 characters, 1 uppercase letter and 1 number',
    })
    @IsString()
    @IsStrongPassword({ minLength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
    password: string;

}
