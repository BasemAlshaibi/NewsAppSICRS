import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/models/icategory';

@Component({
  selector: 'app-news-grid-wide',
  templateUrl: './news-grid-wide.component.html',
  styleUrls: ['./news-grid-wide.component.scss']
})
export class NewsGridWideComponent implements OnInit {

  @Input('CategoryNews') CategoryNews:  Partial<ICategory>;


  constructor() { }

  ngOnInit(): void {

   }

}
