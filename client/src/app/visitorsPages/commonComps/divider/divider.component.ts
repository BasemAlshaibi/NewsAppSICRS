import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {

  @Input() title: string;

  @Input() url?: URL;



  constructor() { }

  ngOnInit(): void {
 
  }

}
