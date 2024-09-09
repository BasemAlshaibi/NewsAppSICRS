import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/shared/models/inews';
import { VisitorsPagesService } from '../visitors-pages.service';

@Component({
  selector: 'app-main-news',
  templateUrl: './main-news.component.html',
  styleUrls: ['./main-news.component.scss']
})
export class MainNewsComponent implements OnInit {
 // firstNews:Partial<INews>[];
  otherNews: Partial<INews>[];
   firstNews: Partial<INews>;



  constructor(public visitorsPagesService: VisitorsPagesService) { }

  ngOnInit(): void {
    this.getNewsList();

  }
  getNewsList() {

    this.visitorsPagesService.getMainNews().subscribe(response => {

     this.firstNews = response[0]; 
       this.otherNews = response.slice(1);
 

 
    }, error => {
      console.log(error);
    })

  }

}
