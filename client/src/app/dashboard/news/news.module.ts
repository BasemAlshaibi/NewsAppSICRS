import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { ImageNewsUploaderComponent } from './image-news-uploader/image-news-uploader.component';


@NgModule({
  declarations: [
    NewsListComponent,
    AddOrEditComponent,
    ImageNewsUploaderComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule
  ]
})
export class NewsModule { }
