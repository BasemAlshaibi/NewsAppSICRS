import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { INews } from 'src/app/shared/models/inews';
import { NewsParams } from 'src/app/shared/models/news-params';
import { Pagination } from 'src/app/shared/models/pagination';
 import { VisitorsPagesService } from '../visitors-pages.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {


  newsList: INews[];
  pagination: Pagination;
  newsParams: NewsParams;
  isNotFound:boolean;
  searchTerm:string;


  constructor(public visitorsPagesService: VisitorsPagesService, private router: Router, private route: ActivatedRoute,private titleService:Title) {

    this.newsParams = this.visitorsPagesService.getNewsParams();
   }  

 
ngOnInit(): void {
//    this.route.queryParamMap.subscribe(params => console.log(params.get("q")));  

  this.route.queryParamMap.subscribe(para => {
    const search = para.get('q');

    this.searchTerm = para.get('q');

    const params = this.visitorsPagesService.getNewsParams();
    if (search !== null) {
      params.search = search;
      this.visitorsPagesService.setNewsParams(params);
      this.getNewsList();
     }
  
  });


}

getNewsList() {

  this.visitorsPagesService.getNewsForCategory().subscribe(response => {

    this.newsList = response.result;
    this.pagination = response.pagination;
    this.isNotFound = false;


 
    this.titleService.setTitle("Search Results");



  }, error => {
   this.isNotFound = true;
  this.titleService.setTitle( "  No results found"  );

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