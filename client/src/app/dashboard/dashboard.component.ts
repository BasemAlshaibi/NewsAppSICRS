import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(private titleService:Title) {

    this.titleService.setTitle(" لوحة التحكم  | إدارة المحتوى");

   }

  ngOnInit(): void {
  }

 
  isCollapsed:boolean = false;

  setCollapsedValue(state:any){
 
    this.isCollapsed = state;
  }

  
}
