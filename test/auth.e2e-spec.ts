import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { disconnect } from 'process';
import { AppModule } from '../src/app.module';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../src/auth/auth.constants';



const loginDTO = {
    login: "LanaSvetCat@gmail.com",
    password: "test"
}

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();

    });

    it('/auth/login (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDTO)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined();
            });
    })

    it('/auth/login (POST)- error login', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDTO, login: 'base@gmail.com' })
            .expect(401, {
                statusCode: 401,
                error: 'Unauthorized',
                message: USER_NOT_FOUND_ERROR
            });
    })

    it('/auth/login (POST)- error password', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDTO, password: '12345' })
            .expect(401, {
                statusCode: 401,
                error: 'Unauthorized',
                message: WRONG_PASSWORD_ERROR
            });
    })
})
