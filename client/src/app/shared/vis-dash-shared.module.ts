import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../core/Helpers/truncate.pipe';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { IconsProviderModule } from '../icons-provider.module';
import { PagerComponent } from './components/pager/pager.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MomentModule } from 'ngx-moment';



// سنستخدم هنا الحزم والعناصر التي ستكون مطلوبة في لوحة التحكم وفي صفحات الواجهة الخاصة بالزوار


@NgModule({
  declarations: [
    TruncatePipe,
    PagerComponent
  ],
  imports: [
    CommonModule,
    NzPaginationModule
  ],
  exports: [
    TruncatePipe,
    NzModalModule,
    IconsProviderModule,
    NzImageModule,
    NzBadgeModule,
    NzAvatarModule,
    NzAlertModule,
    NzToolTipModule,
    NzDividerModule,
    NzTableModule,

    MomentModule,//  لمكتبة المومينت الخاصة بالتواريخ
  
    PagerComponent 
   ]
})
export class VisDashSharedModule { }
