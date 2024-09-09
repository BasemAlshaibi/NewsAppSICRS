import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-panel',
  templateUrl: './footer-panel.component.html',
  styleUrls: ['./footer-panel.component.scss']
})
export class FooterPanelComponent implements OnInit {


   d = new Date();
   year; 

  constructor() { }

  ngOnInit(): void {

    this.year = this.d.getFullYear();
  }

}
