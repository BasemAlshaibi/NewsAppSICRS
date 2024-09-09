import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorsPagesRoutingModule } from './visitors-pages-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { NavBarCategoriesComponent } from './nav-bar-categories/nav-bar-categories.component';
import { BreakingNewsBarComponent } from './breaking-news-bar/breaking-news-bar.component';
import { MarqueeNewsBarComponent } from './marquee-news-bar/marquee-news-bar.component';
import { MainNewsComponent } from './main-news/main-news.component';
import { EditorChoiceComponent } from './editor-choice/editor-choice.component';
 import { FooterComponent } from './footer/footer.component';
 import { NewsDetailsComponent } from './news-details/news-details.component';
import { CategoryNewsComponent } from './category-news/category-news.component';
 import { NzInputModule } from 'ng-zorro-antd/input';
import { SwiperModule } from 'swiper/angular';
import { OurServicesComponent } from './our-services/our-services.component';
import { NewsGridWideComponent } from './news-grid-wide/news-grid-wide.component';
import { NewsGridThinComponent } from './news-grid-thin/news-grid-thin.component';
import { HomeContientComponent } from './home-contient/home-contient.component';
import { EditorChoiceInsideComponent } from './editor-choice-inside/editor-choice-inside.component';
import { ReadMoreComponent } from './read-more/read-more.component';
 
 import { VisDashSharedModule } from '../shared/vis-dash-shared.module';
 import { ThumbsSwiperImagesComponent } from './thumbs-swiper-images/thumbs-swiper-images.component';
 import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DividerComponent } from './commonComps/divider/divider.component';
import { SectionHeadingComponent } from './commonComps/section-heading/section-heading.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RssComponent } from './Rss/rss.component';
//import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonModule } from 'ngx-sharebuttons/button';

import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';


import { ShareButtonsComponent } from './share-buttons/share-buttons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
  

   

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
     NavBarCategoriesComponent,
    BreakingNewsBarComponent,
    MarqueeNewsBarComponent,
    MainNewsComponent,
    EditorChoiceComponent,
     FooterComponent,
     NewsDetailsComponent,
    CategoryNewsComponent,
 
    OurServicesComponent,
    NewsGridWideComponent,
    NewsGridThinComponent,
     HomeContientComponent,
    EditorChoiceInsideComponent,
    ReadMoreComponent,
 
     ThumbsSwiperImagesComponent,
  
     DividerComponent,
     SectionHeadingComponent,
     SearchResultsComponent,
     ContactUsComponent,
     AboutUsComponent,
     RssComponent,
     ShareButtonsComponent  
  ],
  imports: [
    CommonModule,
    SwiperModule,
    NzInputModule, // من هنا مؤقت
    InfiniteScrollModule, // التحميل عن وصول الماوس الى العنصر
   // ShareButtonModule,
    ShareIconsModule,
    ShareButtonsModule,
    FontAwesomeModule,// حاليا لايقونة الار اس اس فقط وكذلك المكتبة مستخدمة في الشير بتنس

 
    VisDashSharedModule, // فيه العناصر المطلوبة بلوحة التحكم وبالواجهة
    VisitorsPagesRoutingModule
  ],
  exports:
  [    HeaderComponent, // ليش تصدرهن
       NavBarCategoriesComponent]
})
export class VisitorsPagesModule { }