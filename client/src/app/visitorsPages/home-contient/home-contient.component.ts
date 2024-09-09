import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICategory } from 'src/app/shared/models/icategory';
import { VisitorsPagesService } from '../visitors-pages.service';

@Component({
  selector: 'app-home-contient',
  templateUrl: './home-contient.component.html',
  styleUrls: ['./home-contient.component.scss']
})
export class HomeContientComponent implements OnInit {


  CategoriesNewsList: Partial<ICategory>[];

  constructor(public visitorsPagesService: VisitorsPagesService,private titleService:Title) {
    this.titleService.setTitle("News CMS | Main");

   }

  ngOnInit(): void {
    this.getCategoriesNews();

  }

  
  getCategoriesNews() {

    this.visitorsPagesService.getNewsForCategoriesSectionsHomePage().subscribe(response => {

     this.CategoriesNewsList = response;  

 

 
    }, error => {
      console.log(error);
    })

  }

}
