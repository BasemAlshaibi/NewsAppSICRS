import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ICategory } from 'src/app/shared/models/icategory';
import { INews } from 'src/app/shared/models/inews';
import { NewsParams } from 'src/app/shared/models/news-params';
import { Pagination } from 'src/app/shared/models/pagination';
import { CategoryService } from '../../category/category.service';
import { UserService } from '../../users/user.service';
import { NewsService } from '../news.service';
import { endOfMonth, startOfMonth, startOfToday, endOfToday, startOfYear, endOfYear, subDays } from 'date-fns';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.less']
})
export class NewsListComponent implements OnInit {

  newsList: INews[];
  pagination: Pagination;
  newsParams: NewsParams;
  sortOptions = [
    { label: 'Created At', value: 'CreatedAt' },

    { label: 'Top News', value: 'TopNews' },
  ];
  SortSelectedValue = { label: "", value: "", };
  //  categories Select
  listOfcategories: Array<{ value: string; label: string ;isActive:boolean }> = [];
  SelectedCategory: { value: string; label: string ;isActive:boolean };
  //  Created Users Select
  listOfCreatedUser: Array<{ value: string; label: string; photoUrl: string }> = [];
  SelectedCreatedUser = [];

    //  date ranges

  date = null;
  dateFormat = 'dMMMy-h:mma';
  ranges = { Today: [startOfToday(), endOfToday()], 'Last 7 Days': [subDays(new Date(), 7), new Date()], 'This Month': [startOfMonth(new Date()), endOfMonth(new Date())], 'This Year': [startOfYear(new Date()), endOfYear(new Date())] };
  //search
  @ViewChild('search', { static: false }) searchTerm: ElementRef;

  statusValue:string ;

  constructor(public newsService: NewsService, private userService: UserService, private categoryService: CategoryService, private msg: NzMessageService,private router: Router, private titleService:Title , private translate: TranslateService) {
    this.newsParams = this.newsService.getNewsParams();


    this.titleService.setTitle(this.translate.instant('NEWSLIST.NewsList'));

  }

  ngOnInit(): void {
    this.getNewsList();
    this.getCategories();
    this.getUsers();
    this.statusValue =  this.newsParams.status;  
   }

  getNewsList() {

    this.newsService.getAllNews().subscribe(response => {

      this.newsList = response.result;
      this.pagination = response.pagination;

    }, error => {
      console.log(error);
    })

  }


  getCategories() {

    this.categoryService.getCategories().subscribe(response => {
      this.listOfcategories = response.map(item => ({
        value: item.name,
        label: item.name,
        isActive :item.status
      }));


    }, error => {
      console.log(error);
    })

  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.listOfCreatedUser = response.result.map(item => ({
        value: item.username,
        label: item.knownAs || item.username,
        photoUrl: item.photoUrl

      }));

    }, error => {
      console.log(error);
    })

  }




  onPageIndexChange(event: any) {

    const params = this.newsService.getNewsParams();
    if (params.pageIndex !== event) {
      params.pageIndex = event;
      this.newsService.setNewsParams(params);
      this.getNewsList();
    }
  }

  onPageSizeChange(event: any) {

    const params = this.newsService.getNewsParams();
    if (params.pageSize !== event) {
      params.pageSize = event;
      this.newsService.setNewsParams(params);
      this.getNewsList();
    }
  }

  onStatusChange(event: any) {

    // console.log(event);
  //   console.log(this.statusValue);
    const params = this.newsService.getNewsParams();


    params.status = this.statusValue;
    this.newsService.setNewsParams(params);
    this.getNewsList();
  }

  

  onSortSelected(sort: { label: string; value: string }): void {

    const params = this.newsService.getNewsParams();
    if (sort != null) {
      params.sort = sort.value;
      this.newsService.setNewsParams(params);
      this.getNewsList();

    } else {
      // نعمل له كلير يعني
      params.sort = "CreatedAt";
      this.newsService.setNewsParams(params);
      this.getNewsList();
    }
  }

  onCategorySelected() {
 
    const params = this.newsService.getNewsParams();
    if (this.SelectedCategory != null) {
      params.category = this.SelectedCategory.label.toString();
      this.newsService.setNewsParams(params);
      this.getNewsList();

    }
    else {
      params.category = null;
      this.newsService.setNewsParams(params);
      this.getNewsList();
    }

  }

  onCreatedUserSelected() {
    const params = this.newsService.getNewsParams();
    if (this.SelectedCreatedUser != null) {
      params.createdBy = this.SelectedCreatedUser.toString();
      this.newsService.setNewsParams(params);
      this.getNewsList();
    }
    else {
      // نعمل له كلير يعني
      params.createdBy = null;
      this.newsService.setNewsParams(params);
      this.getNewsList();
    }
  }


  //
  onDateRangeChange(result: Date[]): void {
 


    const params = this.newsService.getNewsParams();
    if (result.length > 0) {
      params.MinDate = result[0].toISOString();
      params.maxDate = result[1].toISOString();
      this.newsService.setNewsParams(params);
      this.getNewsList();
    }
    else {
      // نعمل له كلير يعني
      params.MinDate = null;
      params.maxDate = null;
      this.newsService.setNewsParams(params);
      this.getNewsList();
    }

  }

  //
  onSearch() {
    const params = this.newsService.getNewsParams();
    params.search = this.searchTerm.nativeElement.value.trim();
    params.pageIndex = 1;
    this.newsService.setNewsParams(params);
    this.getNewsList();
  }

  // Change News Status  
  onChangeNewsStatus(data: INews, command: string) {

    this.newsService.changeNewsStatus(data.id, command).subscribe(() => {
      this.getNewsList();
      if (command === "Rejected") {
        this.msg.success(this.translate.instant('NEWSLIST.RejectedSuccess'));
      }
     if (command === "Restore") {
      this.msg.success(this.translate.instant('NEWSLIST.RestoreSuccess'));
    }
      if (command === "PublishNow") {
        this.msg.success(this.translate.instant('NEWSLIST.PublishNowSuccess'));
      }
      if (command === "Approve") {
        this.msg.success(this.translate.instant('NEWSLIST.ApproveSuccess'));
      }

    })


  }

  //deleteDraftNews
  ondeleteDraftNews(data: INews) {

    this.newsService.deleteDraftNews(data.id).subscribe(() => {
      this.getNewsList();

      this.msg.success(this.translate.instant('NEWSLIST.DeleteDraftSuccess'));

    })

  }

  //Reset

  onReset() {

    this.SortSelectedValue = { label: "", value: "", };
    this.searchTerm.nativeElement.value = '';
    this.newsParams = new NewsParams();
    this.newsService.setNewsParams(this.newsParams);
    this.getNewsList();
    this.statusValue = "";

  }
 

  openNewTab(id) { // لمعاينة المادة بصفحة الزوار

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['../../../news/',id])
    );
  
    window.open(url, '_blank');
  }



}
