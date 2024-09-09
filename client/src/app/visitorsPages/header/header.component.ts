import { Component, OnInit } from '@angular/core';
 
 

//import ar from 'date-fns/locale/ar-SA'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 
  constructor() {
 
  }
  ngOnInit(): void {
 
  
   }
   openNewTab(urlTarget) {  
 
      window.open(urlTarget, '_blank');
    }

}
