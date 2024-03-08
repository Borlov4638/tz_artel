import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppModule (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('GeoModule', () => {
        it('shoud return 200 with rigt data', () => {
            return request(app.getHttpServer())
                .get('/geolocate?ip=80.90.179.53')
                .expect(200)
                .expect({
                    lat: '52.3759',
                    lng: '4.8975',
                    country: 'NL',
                    city: 'Amsterdam',
                });
        });

        it('shoud throw not found error  if the IP is not in database', () => {
            return request(app.getHttpServer())
                .get(`/geolocate?ip='127.0.0.1'`)
                .expect(404);
        });
    });
});
