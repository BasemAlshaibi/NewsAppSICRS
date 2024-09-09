import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { INews } from 'src/app/shared/models/inews';
import { SwiperOptions } from 'swiper';
import { VisitorsPagesService } from '../visitors-pages.service';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ReadMoreComponent implements OnInit {

  @Input('exceptNewsId') newsId: number;
  newsList: Partial<INews>[];



 
config: SwiperOptions = {
  slidesPerView: 3,
  spaceBetween: 40,
 
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
   // dynamicBullets: true
  },
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
      '670': {
      slidesPerView: 2,
      spaceBetween: 20
    }, 
      '1100': {
      slidesPerView: 3,
      spaceBetween: 20
    } 
    
  }
};
constructor(public visitorsPagesService: VisitorsPagesService) { }

ngOnInit(): void {
 // this.getNewsList();
 
} 

getNewsList() {

this.visitorsPagesService.getLastNews(10).subscribe(response => {

  this.newsList = response.filter(n => n.id != this.newsId);
 

}, error => {
  console.log(error);
})

}

blockInfiniteScroll:boolean;



onScrollDown(ev: any) {

  this.getNewsList();

 this.blockInfiniteScroll=true;

}

}
