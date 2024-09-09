import { Component, EventEmitter, OnInit } from '@angular/core';
import { CategoryParams } from 'src/app/shared/models/category-params';
import { ICategory } from 'src/app/shared/models/icategory';
 import { CategoryService } from './category.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: ICategory[];
  categoriesToCompare: ICategory[];
   categoryParams: CategoryParams;// غير مستخدمة
  recordId: string | null = null;
  isAddMode:boolean=true;
 
  private isEditingSource =  new BehaviorSubject<boolean>(false);
  isEditing$ = this.isEditingSource.asObservable();
 


  constructor( private categoryService: CategoryService  ,private msg: NzMessageService, private titleService:Title , private translate: TranslateService) {
   // this.categoryParams = this.categoryService.getCategoryParams();
   this.titleService.setTitle(this.translate.instant('Categories.CategoriesManagement'));
   }

  ngOnInit(): void {
    this.getCategories();
    this.isEditingCheck();
 
  }

  getCategories() {

    this.categoryService.getCategories().subscribe(response => {
 
      this.categories = response;
      this.categoriesToCompare = JSON.parse(JSON.stringify(this.categories));
  

    }, error => {
      console.log(error);
    })

  }

  drop(event: CdkDragDrop<ICategory[]>): void {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
     
    event.item.data.forEach((x,index)=>{
      x.order=index+1 
    })
 
    this.isEditingCheck();
   
  }

  //
  isEditingCheck(){
 
    if(JSON.stringify(this.categories) == JSON.stringify(this.categoriesToCompare)){

   this.isEditingSource.next(true);


  }else{
 
    this.isEditingSource.next(false);


  }
 
   
  }
 

//Table with editable cells
   
  startEdit(id: string): void {
    this.recordId = id;
  }

  stopAdd(value:any ): void {
     
    if(value.length > 0){    
      this.recordId = null; 
      this.isEditingCheck();
    } 


  }

  addRow(): void {
    this.categories = [
            {
        id:null,
        name: "",
        status: true,
        order: this.categories.length + 1,
        nameCategoryUrl:""
      },...this.categories
    ];

    this.isAddMode=false;
 
  }
 



  ///
 
 
  //save All Changes
  saveAllChanges(){

    this.categoryService.UpdateAllCategories(this.categories).subscribe(() => {    
      this.msg.success('Changes Updated successfully');  
      this.getCategories();
      this.isEditingSource.next(true);
      this.isAddMode=true;

    //  this.isEditingCheck();
    })

  }

  // Rest
  
  onReset() {
   
   
    this.getCategories();
    this.isEditingSource.next(true);
    this.isAddMode=true;

  }

}
