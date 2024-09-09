import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faRss } from '@fortawesome/free-solid-svg-icons';

 
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faRss = faRss;

  ngOnInit(): void {
  }

  constructor(private router: Router) {
 
}
openNewTab(urlTarget) {  
 

  window.open(urlTarget, '_blank');
}

}
