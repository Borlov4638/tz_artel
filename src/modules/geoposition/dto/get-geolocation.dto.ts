import { IsIP } from 'class-validator';

export class GetGeolocationDTO {
    @IsIP()
    ip: string;
}
