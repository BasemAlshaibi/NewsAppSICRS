import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
// import Swiper core and required modules
import SwiperCore, { Navigation,Autoplay, Pagination, Scrollbar, A11y,EffectFade } from 'swiper';
import { INews } from 'src/app/shared/models/inews';
import { VisitorsPagesService } from '../visitors-pages.service';

// install Swiper modules
SwiperCore.use([Navigation,Autoplay, Pagination, Scrollbar, A11y,EffectFade]);

 

@Component({
  selector: 'app-editor-choice',
  templateUrl: './editor-choice.component.html',
  styleUrls: ['./editor-choice.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class EditorChoiceComponent implements OnInit {

  newsList: Partial<INews>[];

  
//https://swiperjs.com/angular
//https://swiperjs.com/swiper-api#parameters   //breakpoints
  config: SwiperOptions = {
    //slidesPerView: 3,
   // spaceBetween: 50,
   // navigation: true,
  /*  pagination: { clickable: true,
      renderBullet: function (index, className) {
    //    return '<span class="' + className + '">' + (index + 1) + "</span>";
    return '<span class="' + className + '">' + (index + 1) + "</span>";

      },

     },*/
    scrollbar: { draggable: true },
     autoplay:{
      delay: 2500,
      disableOnInteraction: false
    },
    breakpoints:{
      '320': {
        slidesPerView: 1,
        spaceBetween: 10
      },
        '660': {
        slidesPerView: 2,
        spaceBetween: 20
      },
        '900': {
        slidesPerView: 3,
        spaceBetween: 20
      },
       
      '1200': {
        slidesPerView: 4,
        spaceBetween: 30
      }
      
    }
  };

  constructor(public visitorsPagesService: VisitorsPagesService) { }
  
  ngOnInit(): void {
    this.getNewsList();
} 

getNewsList() {

  this.visitorsPagesService.getEditorChoiceNews(10).subscribe(response => {

    this.newsList = response;
//   console.log(response);



  }, error => {
    console.log(error);
  })

}
  // (swiper)="onSwiper($event)" (slideChange)="onSlideChange()" 
  // onSwiper([swiper]) {
  //   console.log(swiper);
  // }
  // onSlideChange() {
  //   console.log('slide change');
  // }

  blockInfiniteScroll:boolean;



onScrollDown(ev: any) {

  this.getNewsList();

 this.blockInfiniteScroll=true;

}

 

}
