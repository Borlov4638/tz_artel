import { IsIP } from 'class-validator';

export class getGeolocationDTO {
    @IsIP()
    ip: string;
}
