import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @HttpCode(201)
    @Post('register')
    @ApiBody({ type: AuthDto })
    @ApiCreatedResponse({ description: 'User registration' })
    @ApiBadRequestResponse({ description: ALREADY_REGISTERED_ERROR })
    async register(@Body() dto: AuthDto) {
        const oldUser = await this.authService.findUser(dto.login);
        if (oldUser) throw new BadRequestException(ALREADY_REGISTERED_ERROR)
        return this.authService.createUser(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    @ApiBody({ type: AuthDto })
    @ApiOkResponse({ description: 'User login' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    async login(@Body() { login, password }: AuthDto) {
        const { email } = await this.authService.validateUser(login, password);
        return this.authService.login(email);
    }
}
