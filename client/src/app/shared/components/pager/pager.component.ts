import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input() totalCount: number;
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Input() totalPages: number;

  @Output() PageIndexChange = new EventEmitter<number>();
  @Output() PageSizeChange = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  onPageIndexChange(event: any) {
    this.PageIndexChange.emit(event);
  }

  onPageSizeChange (event: any) {
   this.PageSizeChange.emit(event);
  }

}
