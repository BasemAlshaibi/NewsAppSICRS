import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NzImage, NzImageService } from 'ng-zorro-antd/image';
import { INewsImageResponse } from 'src/app/shared/models/inews';
// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, SwiperOptions, Thumbs } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-thumbs-swiper-images',
  templateUrl: './thumbs-swiper-images.component.html',
  styleUrls: ['./thumbs-swiper-images.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThumbsSwiperImagesComponent implements OnInit {

  @Input() images: INewsImageResponse[];
  thumbsSwiper: any;

  swiperconfig: SwiperOptions = {
    spaceBetween: 10,
   // navigation: true,
    loop:true ,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
 
      scrollbar: { draggable: true } 
   
  };

  thumbsSwiperconfig: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView:4,
   navigation: true,
   pagination: { clickable: true },
   scrollbar: { draggable: true },
 };



  constructor(private nzImageService: NzImageService) { }

  ngOnInit(): void {
   }

        // Multiple Image Preview
        MultipleImagePreview() {
          const Photos: NzImage[] = this.images.map(img => ({
            src: img.originalUrl,
         //   width: '400px',
           // height: '400px'
      
          }));
          this.nzImageService.preview(Photos, { nzZoom: 1.5, nzRotate: 0 ,nzDirection: 'ltr' });
        }

}
