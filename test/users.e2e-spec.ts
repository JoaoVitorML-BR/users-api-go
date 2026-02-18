import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Users Endpoints (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    }, 30000);

    afterAll(async () => {
        await app.close();
    });

    it('/users (POST)', async () => {
        const timestamp = Date.now();
        const createUserDto = {
            username: `testuser${timestamp}`,
            name: 'Test User',
            email: `teste${timestamp}@gmail.com`,
            password: 'Teste@123',
        };
        const response = await request(app.getHttpServer())
            .post('/users')
            .send(createUserDto)
            .expect(201);
        expect(response.body).toHaveProperty('statusCode', 201);
        expect(response.body).toHaveProperty('status', true);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.username).toBe(createUserDto.username);
        expect(response.body.data.name).toBe(createUserDto.name);
        expect(response.body.data.email).toBe(createUserDto.email);
    });

    it('/users (GET ALL)', async () => {
        const response = await request(app.getHttpServer())
            .get('/users')
            .expect(200);
        expect(response.body).toHaveProperty('statusCode', 200);
        expect(response.body).toHaveProperty('status', true);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });
});