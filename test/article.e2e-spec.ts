import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { disconnect, Types } from 'mongoose';
import { AppModule } from '../src/app.module';
import { ARTICLE_NOT_FOUND } from '../src/article/article.constants';

const testDTO = {
    image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    title: "Hello world",
    description: "This is a test article",
    categories: ["test", "article"]
};

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/article/create (POST)- success', async () => {
        return request(app.getHttpServer())
            .post('/article/create')
            .send(testDTO)
            .expect(201)
            .then(({ body }: request.Response) => {
                createdId = body._id;
                expect(createdId).toBeDefined();
            });
    })

    it('/article/create (POST)- error', async () => {
        return request(app.getHttpServer())
            .post('/article/create')
            .send({ ...testDTO, categories: 'base' })
            .expect(400)
            .then(({ body }: request.Response) => {
                console.log(body);
            })
    })

    it('/article (GET)', async () => {
        return request(app.getHttpServer())
            .get('/article')
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBeGreaterThan(0);
            });
    })

    it('/article/:id (GET)', async () => {
        return request(app.getHttpServer())
            .get('/article/' + createdId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body._id).toBe(createdId);
            });
    })

    it('/article/:id (DELETE) - fail', () => {
        return request(app.getHttpServer())
            .delete('/article/' + new Types.ObjectId().toHexString())
            .expect(404, {
                statusCode: 404,
                message: ARTICLE_NOT_FOUND
            });
    })

    it('/article/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/article/' + createdId)
            .expect(200);
    })

    afterAll(() => {
        disconnect();
    })
})
