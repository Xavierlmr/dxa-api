export class UpdateWallpaperDto {
    //readonly id: number;
    readonly title: string;
    readonly image: string;
    readonly description?: string;
    readonly creation_date: Date;
}