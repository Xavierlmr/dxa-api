import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { WallpapersService } from './wallpapers.service';
import { Wallpaper } from './wallpaper.entity';
import { CreateWallpaperDto } from './dto/create-wallpapers.dto';
import { UpdateWallpaperDto } from './dto/update-wallpaper-dto';
import { diskStorage } from 'multer';
import { extname } from 'path';


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
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage : diskStorage({
            destination: './public/upload',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now()+'-' + Math.round(Math.random() *1e9);
                const ext = extname(file.originalname);
                const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
                return cb(null, filename);
            } 
        })
    }
    ))
    CreateWallpaper(@UploadedFile() file: Express.Multer.File, @Body() newWallpaper: CreateWallpaperDto){
        console.log(newWallpaper);
        newWallpaper.image = file.filename;
        this.wallpaperService.createwallpaper(newWallpaper);
    }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file', {
    //     storage : diskStorage({
    //         destination: './public/upload',
    //         filename: (req, file, cb) => {
    //             const uniqueSuffix = Date.now()+'-' + Math.round(Math.random() *1e9);
    //             const ext = extname(file.originalname);
    //             const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
    //             return cb(null, filename);
    //         } 
    //     })
    // }
    // ))
    // TestUpload(@Body() body){
    //     let test : CreateWallpaperDto = body;
    //     console.log(test);
    // }

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
