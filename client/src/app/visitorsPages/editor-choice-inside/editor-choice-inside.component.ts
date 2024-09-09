import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INews } from 'src/app/shared/models/inews';
import { VisitorsPagesService } from '../visitors-pages.service';

@Component({
  selector: 'app-editor-choice-inside',
  templateUrl: './editor-choice-inside.component.html',
  styleUrls: ['./editor-choice-inside.component.scss']
})
export class EditorChoiceInsideComponent implements OnInit {
  newsList: Partial<INews>[];


  constructor(public visitorsPagesService: VisitorsPagesService,private router: Router, private r:ActivatedRoute) { }
  ngOnInit(): void {
    this.getNewsList();
} 

getNewsList() {

  this.visitorsPagesService.getEditorChoiceNews(4).subscribe(response => {

    this.newsList = response;
//   console.log(response);



  }, error => {
    console.log(error);
  })

}
goToNews(id) {
  this.router.navigate(["news/",id], { relativeTo: this.r.parent });
}
}
