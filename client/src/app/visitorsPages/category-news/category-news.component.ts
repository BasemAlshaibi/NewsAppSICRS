import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { INews } from 'src/app/shared/models/inews';
import { NewsParams } from 'src/app/shared/models/news-params';
import { Pagination } from 'src/app/shared/models/pagination';
import { VisitorsPagesService } from '../visitors-pages.service';

@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.scss']
})
export class CategoryNewsComponent implements OnInit {

  newsList: INews[];
  pagination: Pagination;
  newsParams: NewsParams;


  constructor(public visitorsPagesService: VisitorsPagesService, private router: Router, private route: ActivatedRoute,private titleService:Title) {
    this.newsParams = this.visitorsPagesService.getNewsParams();

   }

  ngOnInit(): void {

    this.route.paramMap.subscribe(para => {
      const CategoryId = Number(para.get('id'));

      const params = this.visitorsPagesService.getNewsParams();
      if (CategoryId !== null) {
        params.categoryId = CategoryId;
        this.visitorsPagesService.setNewsParams(params);
        this.getNewsList();
       }
    
    });

 
  }

  getNewsList() {

    this.visitorsPagesService.getNewsForCategory().subscribe(response => {

      this.newsList = response.result;
      this.pagination = response.pagination;
 
    this.titleService.setTitle(response.result[0].category +" | أخبار");



    }, error => {
      console.log(error);
    })

  }

  onPageIndexChange(event: any) {

    const params = this.visitorsPagesService.getNewsParams();
    if (params.pageIndex !== event) {
      params.pageIndex = event;
      this.visitorsPagesService.setNewsParams(params);
      this.getNewsList();
    }

    
  }

  onPageSizeChange(event: any) {
 
    const params = this.visitorsPagesService.getNewsParams();
    if (params.pageSize !== event) {
      params.pageSize = event;
      this.visitorsPagesService.setNewsParams(params);
      this.getNewsList();
    }

   
  }

}
