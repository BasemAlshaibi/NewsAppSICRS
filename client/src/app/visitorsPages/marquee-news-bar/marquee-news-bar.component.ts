import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';

// import Swiper core and required modules
import SwiperCore, { Navigation,Autoplay, Pagination, Scrollbar, A11y,EffectFade } from 'swiper';
import { INews } from 'src/app/shared/models/inews';
import { VisitorsPagesService } from '../visitors-pages.service';

// install Swiper modules
SwiperCore.use([Navigation,Autoplay, Pagination, Scrollbar, A11y,EffectFade]);


@Component({
  selector: 'app-marquee-news-bar',
  templateUrl: './marquee-news-bar.component.html',
  styleUrls: ['./marquee-news-bar.component.scss'],
 encapsulation: ViewEncapsulation.None,

  
})
export class MarqueeNewsBarComponent implements OnInit {

  newsList: Partial<INews>[];

  public getScreenWidth: any;
 

  config: SwiperOptions = {
       loop:true,
       direction: 'vertical',
       slidesPerView: 1,
       mousewheel: true,
       navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
 
  //   direction :"vertical",
    // navigation: true,
  //   navigation: {
  //    nextEl: '.swiper-button-next',
  //    prevEl: '.swiper-button-prev',
  //  },
 
     scrollbar: { draggable: true },
      autoplay:{
       delay: 2500,
       disableOnInteraction: false
     } 
   };

  constructor(public visitorsPagesService: VisitorsPagesService) { }

    ngOnInit(): void {
      this.getNewsList();
  } 
  
  getNewsList() {

    this.getScreenWidth = window.innerWidth;

    this.visitorsPagesService.getLastNews(20).subscribe(response => {

      this.newsList = response;
 

    }, error => {
      console.log(error);
    })

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    }

}
