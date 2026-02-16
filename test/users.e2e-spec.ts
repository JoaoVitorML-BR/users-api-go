import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Users Endpoints (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    // it('/users (POST)', async () => {
    //     const createUserDto = {
    //         username: 'testuser',
    //         password: 'testpassword',
    //     };
    //     const response = await request(app.getHttpServer())
    //         .post('/users')
    //         .send(createUserDto)
    //         .expect(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.username).toBe(createUserDto.username);
    // });

    it('/users (GET ALL)', async () => {
        const response = await request(app.getHttpServer())
            .get('/users')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some((u: any) => u.username === 'testuser')).toBe(true);
    });
});