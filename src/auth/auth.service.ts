import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>, private readonly jwtService: JwtService) { }

    async createUser(dto: AuthDto): Promise<UserDocument> {
        const salt = await genSalt(10);
        const newUser = new this.userModel({
            email: dto.login,
            passwordHash: await hash(dto.password, salt),
        });
        return newUser.save();
    }

    async findUser(email: string): Promise<UserDocument> | null {
        return this.userModel.findOne({
            email
        }).exec();
    }
    async validateUser(email: string, password: string): Promise<Pick<UserDocument, 'email'>> {
        const user = await this.findUser(email);
        if (!user) throw new UnauthorizedException(USER_NOT_FOUND_ERROR);

        const isCorrectPassword = await compare(password, user.passwordHash);
        if (!isCorrectPassword) throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
        return { email: user.email }

    }
    async login(email: string) {
        const payload = { email };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

}
