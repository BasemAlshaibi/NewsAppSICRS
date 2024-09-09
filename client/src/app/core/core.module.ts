import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RouterModule } from '@angular/router';
     




@NgModule({
  declarations: [
    NotFoundComponent,
    ServerErrorComponent,
    TestErrorComponent,
    NotAuthorizedComponent,
  //  TruncatePipe
  ],
  imports: [
    CommonModule,
    NzResultModule,
    NzModalModule,
    RouterModule
     
  ]
 })
export class CoreModule { }

/**
 * هنا نضم انواع السيرفس التي ممكن نستخدمها على مدى المشروع ككل
 * كذلك الكومبنتس اللي تكون كومن ثابتة كالنافبار وصفحة الاخطاء وغيره
 * هنا اي عنصر ممكن نستخدمه برع نعمل له تصدير
 * 
 * هذا الموديل نعمل له امبورت حصرا في الاب موديل
 * 
 */
