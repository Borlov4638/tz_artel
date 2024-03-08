import axios from 'axios';

interface GeolocationNotion {
    lat: string;
    lng: string;
    country: string;
    city: string;
}

export class GeoipService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getLocationByIp(ip: string): Promise<GeolocationNotion> {
        try {
            const response = await axios.get(`${this.baseUrl}?ip=${ip}`);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data);
            } else {
                throw new Error('Failed to connect to the server');
            }
        }
    }
}
