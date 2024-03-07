import { Controller, Get, Param, Query } from '@nestjs/common';
import { GeoService } from './geo.service';
import { getGeolocationDTO } from './dto/get-geolocation.dto';
import { GeolocationNotion } from './types/geoip-response.type';

@Controller('/geolocate')
export class GeoController {
    constructor(private readonly geolocationService: GeoService) {}

    @Get()
    getGeolocation(@Query() ipQuery: getGeolocationDTO): GeolocationNotion {
        return this.geolocationService.getLocationByIp(ipQuery.ip);
    }
}
