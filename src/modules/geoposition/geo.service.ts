import { Injectable, NotFoundException } from '@nestjs/common';
import * as geoip from 'geoip-lite';
import { GeolocationNotion } from './types/geoip-response.type';

@Injectable()
export class GeoService {
    constructor() {}

    getLocationByIp(ip: string): GeolocationNotion {
        const geo = geoip.lookup(ip);
        if (!geo) {
            throw new NotFoundException('GeoIP lookup failed for IP address: ' + ip);
        }
        return this.mapLocationResponse(geo);
    }

    private mapLocationResponse(ipResponse: geoip.Lookup): GeolocationNotion {
        return {
            lat: ipResponse.ll[0].toString(),
            lng: ipResponse.ll[1].toString(),
            country: ipResponse.country,
            city: ipResponse.city,
        };
    }
}
