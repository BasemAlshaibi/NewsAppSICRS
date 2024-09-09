import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/models/icategory';
import { environment } from 'src/environments/environment';
import { VisitorsPagesService } from '../visitors-pages.service';
import { faRss } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.scss']
})
export class RssComponent implements OnInit {

  baseUrl = environment.apiForRss;
  CategoriesList: Partial<ICategory>[];
  faRss = faRss;




  constructor(public visitorsPagesService: VisitorsPagesService) { }

  ngOnInit(): void {
    this.getCategoriesList();
 

  }

  getCategoriesList() {
    this.visitorsPagesService.getCategoriesForNavBar().subscribe(response => {

      this.CategoriesList = response;

    }, error => {
      console.log(error);
    })

  }

 


  openNewTab(urlTarget) {
    window.open(this.baseUrl + urlTarget, '_blank');
  }
  openNewTabWithId(urlTarget, id) {
    window.open(this.baseUrl + urlTarget + id, '_blank');
  }


}
