import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { NewsService } from 'src/app/dashboard/news/news.service';
import { INews } from 'src/app/shared/models/inews';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesConfirmService {

  constructor(private modal: NzModalService,private msg: NzMessageService, private newsService: NewsService, private router: Router, private route: ActivatedRoute,private translate: TranslateService ) { }

  nzModelRef: NzModalRef;
  newsToModify: Partial<INews>;
  newsToAdd: Partial<INews>; // للقيم المرسلة للاضافة


  confirm(id,newsForm,newsImageToAdd): Observable<boolean> {

    var title = id ? this.translate.instant('guards.titleEditMode'): this.translate.instant('guards.titleAddMode');
    var content = id ? this.translate.instant('guards.contentEditMode'): this.translate.instant('guards.contentAddMode');

    this.nzModelRef = this.modal.confirm({
      nzTitle: title,
      nzContent: content,
     // nzOkText: 'Save Draft',
      nzOnOk: () =>{
        if(id){
          this.update(id,newsForm);
          return true;
        }else{
          // في حالة كان لدينا الخيار هو التجاهل او حفظ المضاف في مسودة
         // this.saveDraft( newsForm,newsImageToAdd) ;
         //  return true;
  
        }
    
      } ,
      nzOkText: id ? this.translate.instant('guards.OkTextEditMode'): this.translate.instant('guards.OkTextAddMode'),
    //  nzOkType: 'primary',
      nzCancelText: this.translate.instant('guards.Discard'),
       nzOnCancel: () => true // مؤقت
       });
  
  return new Observable<boolean>(this.getResult());
}

 
private getResult() {

  return (observer) => {


    const subscription =  this.nzModelRef.afterClose.subscribe(result => {
      observer.next(result);
      observer.complete();
    });

    
    return {
      unsubscribe() {
        subscription.unsubscribe();
      }


    }
  }
}

// save draft
saveDraft(newsForm: FormGroup,newsImageToAdd){

  this.newsToAdd = {
    title:  newsForm.value.title,
    summary:  newsForm.value.summary,
    content: newsForm.value.content,
    source: newsForm.value.source,

    isShowInMain: newsForm.value.isShowInMain,
    isChooseEditor: newsForm.value.isChooseEditor,
    isBreakingOrImportant: newsForm.value.isBreakingOrImportant,
    breakingOrImportantDuration: newsForm.value.breakingOrImportantDuration,

    publishedAt: newsForm.value.publishedAt,
    newsImageAdd :newsImageToAdd,
    status: "Draft",
    categoryId: newsForm.value.categoryId,
  }
  this.newsService.addNews( this.newsToAdd ).subscribe(
    () => {
      this.msg.success(this.translate.instant('guards.successDraft'));
    },
    (err: any) => console.log(err)
  );
}

// save updates

update (id,newsForm: FormGroup){

  if (newsForm.valid) {

    this.newsToModify = {
      title: newsForm.value.title,
      summary: newsForm.value.summary,
      content: newsForm.value.content,
      source: newsForm.value.source,
      isShowInMain: newsForm.value.isShowInMain,
      isChooseEditor: newsForm.value.isChooseEditor,
      isBreakingOrImportant: newsForm.value.isBreakingOrImportant,
      breakingOrImportantDuration: newsForm.value.breakingOrImportantDuration,
      publishedAt: newsForm.value.publishedAt,
      status: newsForm.value.status,
      categoryId: newsForm.value.categoryId,
    }

    
  this.newsService.updateNews(id, this.newsToModify).subscribe(
    () => {
      this.msg.success(this.translate.instant('guards.successNewsUpdated'));

    },
    (err: any) => console.log(err)
  );


  }
  else
  {
    this.msg.error(this.translate.instant('guards.updateFailures'));
  }

}




}

