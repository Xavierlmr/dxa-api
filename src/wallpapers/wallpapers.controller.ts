import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WallpapersService } from './wallpapers.service';
import { Wallpaper } from './wallpaper.entity';
import { CreateWallpaperDto } from './dto/create-wallpapers.dto';
import { UpdateWallpaperDto } from './dto/update-wallpaper-dto';


@Controller('wallpapers')
export class WallpapersController {
    constructor(private readonly wallpaperService: WallpapersService) {}

    @Get()
    findAll(): Promise<Wallpaper[]>{
        return this.wallpaperService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.wallpaperService.findOne(id);
        console.log('id', id);
    }

    @Post()
    CreateWallpaper(@Body() newWallpaper: CreateWallpaperDto){
        console.log(newWallpaper);
        this.wallpaperService.createwallpaper(newWallpaper);
    }

    @Patch()
    UpdateWallpaper(@Param('id') id: string, @Body() wallpaperToUpdate: UpdateWallpaperDto){
        console.log(wallpaperToUpdate);
        this.wallpaperService.updatewallpaper(wallpaperToUpdate, id);
    }

    @Delete(':id')
    DeleteWallpaper(@Param('id') id: string){
        this.wallpaperService.deletewallpaper(id);
    }

}
