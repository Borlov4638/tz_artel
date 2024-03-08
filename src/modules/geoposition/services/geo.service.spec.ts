import { Test, TestingModule } from '@nestjs/testing';
import { GeoService } from './geo.service';
import * as geoip from 'geoip-lite';
import { NotFoundException } from '@nestjs/common';

describe('GeoService', () => {
    let service: GeoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GeoService],
        }).compile();

        service = module.get<GeoService>(GeoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return location by IP address', () => {
        const mockGeo: geoip.Lookup = {
            range: [3479298048, 3479300095],
            country: 'US',
            region: 'TX',
            eu: '0',
            timezone: 'America/Chicago',
            city: 'San Antonio',
            ll: [29.4969, -98.4032],
            metro: 641,
            area: 1000,
        };
        jest.spyOn(geoip, 'lookup').mockReturnValue(mockGeo);

        const ip = '127.0.0.1';
        const result = service.getLocationByIp(ip);

        expect(result).toEqual({
            lat: '29.4969',
            lng: '-98.4032',
            country: 'US',
            city: 'San Antonio',
        });
    });

    it('should throw NotFoundException if IP address not found', () => {
        jest.spyOn(geoip, 'lookup').mockReturnValue(null);

        const ip = 'invalid_ip';
        expect(() => service.getLocationByIp(ip)).toThrow(NotFoundException);
    });
});
