import { NumberValueAccessor } from "@angular/forms";

export interface INews {

    id: number;
    title: string;
    summary: string;
    content: string;
    source: string;
    isShowInMain: boolean;
    isChooseEditor: boolean;
    isBreakingOrImportant: boolean;
    breakingOrImportantDuration:number;
    createdUserName: string;
    createdAt: Date;
    publishedAt: Date;
    updatedUserName?: string;
    updatedAt?: Date;
    status: string;
   // photoUrl: string;
    photoUrlThumbnail: string;
    photoUrlFullscreen: string;
    newsImages?: INewsImageResponse[];
    newsImageAdd?: INewsImageAdd[];
    categoryId:Number;
    category: string;
    noOfRead: number;
}

export interface INewsImageResponse {
    id: string;
    originalUrl: string;
    fullscreenUrl: string;
    thumbnailUrl: string;
    isMain: boolean;
}

export interface INewsImageAdd {
    id: string;
    folder: string;
    isMain: boolean;
    newsId: number;
}

