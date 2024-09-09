import { Component, Input, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss']
})
export class ShareButtonsComponent implements OnInit {
  @Input() title :string; 
  @Input() desc :string; 
  @Input() img :string; 

  constructor() { }

  ngOnInit(): void {
  }

}
