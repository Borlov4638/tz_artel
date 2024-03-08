import { GeoipService } from './geoip.sdk';

const geoipService = new GeoipService('http://localhost:3001');

async function exampleUsage() {
    try {
        const location = await geoipService.getLocationByIp('127.0.0.1');
        console.log(location);
    } catch (error) {
        console.error(error.message);
    }
}

exampleUsage();
