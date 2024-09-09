import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INews } from 'src/app/shared/models/inews';
import { VisitorsPagesService } from '../visitors-pages.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
 
 

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  news: Partial<INews>; 

 

  constructor(private visitorsPagesService: VisitorsPagesService, private router: Router, private route: ActivatedRoute,public sanitizer: DomSanitizer,private titleService:Title,
    private meta: Meta ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const newsId = Number(params.get('id'));

      if(!isNaN(newsId)){
        this.getNews(newsId);   
       }else{
       this.router.navigate(['not-found'])
        }

    });
/*
         // SEO metadata // تجربة فقط
       //   this.meta.addTag({name: 'description', content: this.news.summary });
   
         // Twitter metadata
         this.meta.addTag({name: 'twitter:card', content: 'summary'});
         this.meta.addTag({name: 'twitter:site', content: '@SqourAljanub'});
         this.meta.addTag({name: 'twitter:title', content: this.news.title});
      //   this.meta.addTag({name: 'twitter:description', content: this.news.summary});
       //  this.meta.addTag({name: 'twitter:text:description', content: this.news.summary});
         this.meta.addTag({name: 'twitter:image', content:this.news.photoUrlThumbnail });
*/
  }

  getNews(newsId) {

    this.visitorsPagesService.getNewsDetails(newsId)
      .subscribe(
        (data: Partial<INews>) => {

          this.news = data; 
          this.titleService.setTitle(data.title);


 
 
        },
        (err: any) =>       this.router.navigate(['not-found'])        //console.log(err)
      );

  }

}
