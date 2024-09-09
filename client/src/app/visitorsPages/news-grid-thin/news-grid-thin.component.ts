import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/models/icategory';
import { INews } from 'src/app/shared/models/inews';

@Component({
  selector: 'app-news-grid-thin',
  templateUrl: './news-grid-thin.component.html',
  styleUrls: ['./news-grid-thin.component.scss']
})
export class NewsGridThinComponent implements OnInit {

  @Input() CategoryNews:  Partial<ICategory>;
 

  constructor() {
 
   }

  ngOnInit(): void { 
 
 
  }

}
