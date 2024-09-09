import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { NzImage, NzImageService } from 'ng-zorro-antd/image';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IUser, UserPhotos } from 'src/app/shared/models/iuser';
import { Pagination } from 'src/app/shared/models/pagination';
import { UserParams } from 'src/app/shared/models/userParams';
import { AdminControllerComponent } from '../admin-controller/admin-controller.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;

  users: IUser[];
  pagination: Pagination;
  userParams: UserParams;
  sortOptions = [
    { label: 'Alphabetical', value: 'name' },
    { label: 'Create Account', value: 'created' },
    { label: 'Last Active', value: 'lastActive' },
    { label: 'Top Active', value: 'topActive' },
  ];
  SortSelectedValue = { label: "", value: "", };
  dropdownSearchVisible = false;



  constructor(private userService: UserService, private nzImageService: NzImageService, private modalService: NzModalService, private viewContainerRef: ViewContainerRef, private titleService:Title , private translate: TranslateService) {
    this.userParams = this.userService.getUserParams();

    this.titleService.setTitle(this.translate.instant('UsersList.UsersList'));


  }

  ngOnInit(): void {
    this.getUsers();

  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response.result;
      this.pagination = response.pagination;

    }, error => {
      console.log(error);
    })
    
  }





  onSortSelected(sort: { label: string; value: string }): void {

    const params = this.userService.getUserParams();
    if (sort != null) {
      params.sort = sort.value;
      this.userService.setUserParams(params);
      this.getUsers();

    } else {
      // نعمل له كلير يعني
      params.sort = "lastActive";
      this.userService.setUserParams(params);
      this.getUsers();
    }


  }

  onSearch() {
    this.dropdownSearchVisible = false;
    const params = this.userService.getUserParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageIndex = 1;
    this.userService.setUserParams(params);
    this.getUsers();
  }



  onPageIndexChange(event: any) {

    const params = this.userService.getUserParams();
    if (params.pageIndex !== event) {
      params.pageIndex = event;
      this.userService.setUserParams(params);
      this.getUsers();
    }
  }

  onPageSizeChange(event: any) {

    const params = this.userService.getUserParams();
    if (params.pageSize !== event) {
      params.pageSize = event;
      this.userService.setUserParams(params);
      this.getUsers();
    }
  }


  onReset() {
    this.dropdownSearchVisible = false;
    this.SortSelectedValue = { label: "", value: "", };
    this.searchTerm.nativeElement.value = '';
    this.userParams = new UserParams();
    this.userService.setUserParams(this.userParams);
    this.getUsers();
  }



  ////Expandable Row

  //// When there's too much information to show and the table can't display all at once

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  // Multiple Image Preview
  MultipleImagePreview(images: UserPhotos[]) {
    const userPhotos: NzImage[] = images.map(img => ({
      src: img.url,
      width: '400px',
      height: '400px'

    }));
    this.nzImageService.preview(userPhotos, { nzZoom: 1.5, nzRotate: 0 ,nzDirection: 'ltr'});
  }
 

  //
  showAdminControllerModal(data:IUser) {


    const modal = this.modalService.create({
      nzTitle: '',
      nzContent: AdminControllerComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        userData:  data,
      } 
     });

    // Return a result when closed
    modal.afterClose.subscribe(result => {
      this.getUsers();
      //console.log('[afterClose] The result is:', result)
    } );
/*
    modal.afterOpen.subscribe(() =>{ 
     
      console.log('[afterOpen] emitted!')    
  });

    const instance = modal.getContentComponent();

    // delay until modal instance created
    setTimeout(() => {
      instance.title = 'Title is changed';
    }, 2000);
*/
  }



}
