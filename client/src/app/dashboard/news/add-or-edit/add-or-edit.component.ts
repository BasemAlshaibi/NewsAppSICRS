import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DisabledTimeConfig, DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { INews, INewsImageAdd, INewsImageResponse } from 'src/app/shared/models/inews';
import { CategoryService } from '../../category/category.service';
import { NewsService } from '../news.service';
import { differenceInCalendarDays, isAfter, isBefore, parseISO } from 'date-fns';
 import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
 import moment from 'moment';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.less']
})
export class AddOrEditComponent implements OnInit {

  newsForm: FormGroup;
 
  errors: string[];
  pageTitle: string;
  dateFormat = 'd MMM y - h:mm a';
  date = Date.now;

  newsImageToAdd: INewsImageAdd[] = [];


  news: Partial<INews>; //  نخزن به القيم التي ادخلها المستخدم بالفورم ثم نعمل لها كستمايز وننقلها الها الباك اند 
  
  //  categories Select
  listOfcategories: Array<{ value: number; label: string ;isActive:boolean }> = [];
  SelectedCategory: { value: string; label: string ;isActive:boolean };

  //  status options

  statusvalue = "Published";
  /* statusOptions = [
     { label: 'Post now', value: "Published" },
     { label: 'Scheduling', value: "Scheduled" },
     { label: 'Save as draft', value: "Draft" }
   ];
 */




  constructor(private fb: FormBuilder, private categoryService: CategoryService, private newsService: NewsService, private router: Router, private route: ActivatedRoute, private msg: NzMessageService
    , private translate: TranslateService,private location: Location, private titleService:Title 
  ) { }


  ngOnInit(): void {

    this.intitializeForm();

    this.getCategories();


    this.route.paramMap.subscribe(params => {
      const newsId = Number(params.get('id'));

      if (newsId) {
        // اذا كان الرابط فيه اي دي فمعناه واجين من اجل التعديل
        this.getNews(newsId); // نستدعي هذه الدالة ونرسل لها الاي دي اللي حصلنا عليه
// عنوان الصفحة وعنوانها بالتاب بالاعلى كذلك        
        this.pageTitle = this.translate.instant('NewsForm.EditNews');
        this.titleService.setTitle(this.translate.instant('NewsForm.EditNews'));


      } else {

        this.pageTitle = this.translate.instant('NewsForm.CreateNewNews') ;
        this.titleService.setTitle(this.translate.instant('NewsForm.CreateNewNews'));


        // اذا مافيش اي دي في الرابط فمعناه  سنعمل عملية جديدة لذلك نسند للعنصر الذي كتبناه فوق من نوع الانترفيس قيم اولية فاضية
        this.news = {

          id: null,
          title: '',
          summary: '',
          content: '',
          status: '',
          categoryId: null,
          newsImages: []
        };

      }

    });

  }

  get isBreakingOrImportant() {
    return this.newsForm.get('isBreakingOrImportant');
  }


  intitializeForm() {


    this.newsForm = this.fb.group({

      title: ['', [Validators.required,Validators.maxLength(65)]],
      summary: ['', [Validators.maxLength(200) ]],
      source: ['', Validators.required],
      content: ['', Validators.required],
      status: ['Published'],
      publishedAt: [new Date()],
      isHasNewsImages: ['', Validators.required],
      categoryId: [, Validators.required],
      isShowInMain: [true],
      isChooseEditor: [false],
      isBreakingOrImportant: [false],
      breakingOrImportantDuration: [30],
    });






  }

  getNews(newsId) {

    this.newsService.getOneNews(newsId)
      .subscribe(
        (data: INews) => {

          this.news = data;
 

          this.editNews(data);
        },
        (err: any) => console.log(err)
      );

  }

  editNews(data: INews) {

    this.newsForm.patchValue({
      title: data.title,
      summary: data.summary,
      source: data.source,
      status: data.status,
      publishedAt: data.publishedAt +"Z",
      content: data.content,
      isHasNewsImages: true,
      categoryId: data.categoryId,
      isShowInMain: data.isShowInMain,
      isChooseEditor: data.isChooseEditor,
      isBreakingOrImportant: data.isBreakingOrImportant
    });

  }


  // بحاجة للمراجعة والتدقيق
  // فالديشن مقارنة التاريخ
  SchedulingDateValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      const schedulingDateValue = control.value;
      //      if (isAfter(parseISO(schedulingDateValue), new Date())) {

      if (isAfter(schedulingDateValue, new Date())) {
        return null;
      } else {
        return { 'schedulingDate': true };
      }
    };
  }


  getCategories() {

    this.categoryService.getCategories().subscribe(response => {
      this.listOfcategories = response.map(item => ({
        value: item.id,
        label: item.name,
        isActive:item.status
      }));

    }, error => {
      console.log(error);
    })


  }
 
  get isHasNewsImages() {
    return this.newsForm.get('isHasNewsImages');
  }
  // news  Image Handle output frpm Uploader

  newsImageHandle(newsImages: INewsImageAdd[]) {
    this.newsImageToAdd = newsImages;

    if (newsImages.length >= 1) {

      this.isHasNewsImages.clearValidators();
      this.isHasNewsImages.updateValueAndValidity();

    } else {

      this.isHasNewsImages.setValidators(Validators.required);
      this.isHasNewsImages.updateValueAndValidity();

    }



  }

  // دالة خاصة لتطبيق الفالديشن دايناميكيا في حالة اختيار الاخبار ان يكون مجدول فهنا يطبق الفالديشن على زمن الجدولة

  get publishedAtControl() {
    return this.newsForm.get('publishedAt');
  }

  onStatusChange(selectedValue: any) {


   // const publishedAtControl = this.newsForm.get('publishedAt');

    switch (selectedValue) {
      case 'Scheduled':
        this.addAllValidators(this.newsForm);
        this.publishedAtControl.setValidators([Validators.required, this.SchedulingDateValidator()]);
        this.publishedAtControl.updateValueAndValidity();


        break;
      case 'Draft':
        this.removeAllValidators(this.newsForm);

        break;
      case 'Published':
       this.addAllValidators(this.newsForm);
       this.publishedAtControl.clearValidators();
       this.publishedAtControl.updateValueAndValidity();
 

        break;
       
      default:
        this.addAllValidators(this.newsForm);
        this.publishedAtControl.clearValidators();
        this.publishedAtControl.updateValueAndValidity(); 
    }


  }

  public removeAllValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }


  public addAllValidators(form: FormGroup) {

    for (const key in form.controls) {

      if(!form.get(key).valid){
        form.get(key).setValidators(this.validationType[key]);
        form.get(key).updateValueAndValidity();
      }

    }

  }

  validationType = {
    'title': [Validators.required,Validators.maxLength(65)],
    'summary': [Validators.maxLength(200)],
    'source': [Validators.required],
    'content': [Validators.required],
    'isHasNewsImages': [Validators.required],

    'status': [],
    'publishedAt': [],

    'categoryId': [Validators.required],
    'isShowInMain': [],
    'isChooseEditor': [],
    'isBreakingOrImportant': [],
    'breakingOrImportantDuration': []
  }


/*
  // الكود الممتعلق بوقف اختيار اي وقت او تاريخ لتزمين الخبر
  // المشكلة انه بالوقت  يظهر ديسبل للساعات التي قبل الساعة الحالية حتى لو كان بيوم لاحق اي غدا مثلا
  // صحح المشكل

  today = new Date();


  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) < 0;

  // الكود التالي لا يعمل بشكل صحيح للتواريخ القادمة
  disabledTime: DisabledTimeFn = (current: Date) => ({
    nzDisabledHours: () =>
      isAfter(current, this.today) ? this.range(0, this.today.getHours()) : [],
    nzDisabledMinutes: () => this.range(0, this.today.getMinutes()),
    nzDisabledSeconds: () => [],
  });


  range(start: number, end: number): number[] {
    const result: number[] = [];

    for (let i = start; i < end; i++) {
      result.push(i);
    }

    return result;
  }

*/


  submitForm() {
 
 
    if (this.newsForm.valid) {

      if (this.news.id) {

         let newsToModify: Partial<INews> = {
          title: this.newsForm.value.title,
          summary: this.newsForm.value.summary,
          content: this.newsForm.value.content,
          source: this.newsForm.value.source,
          isShowInMain: this.newsForm.value.isShowInMain,
          isChooseEditor: this.newsForm.value.isChooseEditor,
          isBreakingOrImportant: this.newsForm.value.isBreakingOrImportant,
          breakingOrImportantDuration: this.newsForm.value.breakingOrImportantDuration,
          publishedAt: this.newsForm.value.publishedAt,//.toISOString()
          status: this.newsForm.value.status,
          categoryId: this.newsForm.value.categoryId,
        }

        this.newsService.updateNews(this.news.id, newsToModify).subscribe(
          () => {
             this.msg.success(this.translate.instant('NewsForm.UpdatedSuccessfully'));
            this.newsForm.markAsPristine();
            this.router.navigate(['dashboard/news/newsList']);

          },
          (err: any) => console.log(err)
        );
      } else {
        // معناة عملية اضافة لخبر جديد

        let newsToAdd : Partial<INews> = {
          title: this.newsForm.value.title,
          summary: this.newsForm.value.summary,
          content: this.newsForm.value.content,
          source: this.newsForm.value.source,

          isShowInMain: this.newsForm.value.isShowInMain,
          isChooseEditor: this.newsForm.value.isChooseEditor,
          isBreakingOrImportant: this.newsForm.value.isBreakingOrImportant,
          breakingOrImportantDuration: this.newsForm.value.breakingOrImportantDuration,

          publishedAt: this.newsForm.value.publishedAt,//.toISOString()
          newsImageAdd: this.newsImageToAdd,
          status: this.newsForm.value.status,
          categoryId: this.newsForm.value.categoryId,
        }

 

        this.newsService.addNews(newsToAdd).subscribe(
          () => {
            this.msg.success(this.translate.instant('NewsForm.AddedSuccessfully'));
            this.newsForm.markAsPristine();  
            this.router.navigate(['dashboard/news/newsList']);
          },
          (err: any) => console.log(err)
        );

      }

    } else {
      Object.values(this.newsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.newsForm.reset();
    for (const key in this.newsForm.controls) {

      if (this.newsForm.controls.hasOwnProperty(key)) {

        this.newsForm.controls[key].markAsPristine();
        this.newsForm.controls[key].updateValueAndValidity();
      }
      
    }
 //   this.intitializeForm();

  }
 
 
  cancel() {
    this.location.back();
  }
//editor-created
//(onEditorCreated)="created($event)"
 

}
