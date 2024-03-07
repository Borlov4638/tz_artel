import { Module } from '@nestjs/common';
import { GeoModule } from './modules/geoposition/geo.module';

@Module({
    imports: [GeoModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
