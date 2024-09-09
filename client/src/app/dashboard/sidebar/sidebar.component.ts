import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  @Input() isCollapsed:boolean = false; // decorate the property with @Input()


  //isCollapsed = false;

  constructor(public accountService: AccountService ) { }

  ngOnInit(): void {
  }

}
