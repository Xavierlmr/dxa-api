import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateWallpaperDto } from './dto/create-wallpapers.dto';
import { UpdateWallpaperDto } from './dto/update-wallpaper-dto';
import { Wallpaper } from './wallpaper.entity';

@Injectable()
export class WallpapersService {
    constructor(private readonly datasource: DataSource) {}

    async findAll(): Promise<Wallpaper[]> {
        return await this.datasource.getRepository(Wallpaper).find();
    }
    
    async findOne(id: string): Promise<Wallpaper> {
    return await this.datasource
        .getRepository(Wallpaper)
        .findOneBy({ id: parseInt(id) });
    }

    async createwallpaper(newWallpaper: CreateWallpaperDto): Promise<string> {
        const wallpaper = new Wallpaper();
        wallpaper.title = newWallpaper.title;
        wallpaper.description = newWallpaper.description;
        wallpaper.image = newWallpaper.image;
        //wallpaper.creation_date = newWallpaper.creation_date;
        await this.datasource.getRepository(Wallpaper).save(wallpaper);
        return 'Wallpaper created';
    }

    async updatewallpaper(wallpaperUpdate: UpdateWallpaperDto, id: string): Promise<string> {
        const wallpaper = await this.findOne(id);
        wallpaper.title = wallpaperUpdate.title ? wallpaperUpdate.title : wallpaper.title;
        wallpaper.description = wallpaperUpdate.description ? wallpaperUpdate.description : wallpaper.description;
        wallpaper.image = wallpaperUpdate.image ? wallpaperUpdate.image : wallpaper.image;
        await this.datasource.getRepository(Wallpaper).save(wallpaper);
        return 'Wallpaper updated';
    }

    async deletewallpaper(id: string): Promise<string> {
        const wallpaper = await this.findOne(id);
        await this.datasource.getRepository(Wallpaper).remove(wallpaper);
        return 'Wallpaper deleted';
    }
    
}
