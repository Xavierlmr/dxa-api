import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallpaper } from './wallpaper.entity';
import { WallpapersController } from './wallpapers.controller';
import { WallpapersService } from './wallpapers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallpaper])],
  controllers: [WallpapersController],
  providers: [WallpapersService]
})
export class WallpapersModule {}
