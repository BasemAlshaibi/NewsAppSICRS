import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
 import { NzRadioModule } from 'ng-zorro-antd/radio';

import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzUploadModule } from 'ng-zorro-antd/upload';
  import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
 import { NzProgressModule } from 'ng-zorro-antd/progress';
 import { NzCardModule } from 'ng-zorro-antd/card';
  import { NzTabsModule } from 'ng-zorro-antd/tabs';
 import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

 
 
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
 import { HasRoleDirective } from './directives/has-role.directive'; 
 import {DragDropModule} from '@angular/cdk/drag-drop'
 import { NzSwitchModule } from 'ng-zorro-antd/switch';
 import { NzTagModule } from 'ng-zorro-antd/tag';
 import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
 import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
 import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
 import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { TranslateModule } from '@ngx-translate/core';
 import { DividerComponent } from './components/divider/divider.component';
 import { ReusableTextInputComponent } from './components/reusable-text-input/reusable-text-input.component';
 import { VisDashSharedModule } from './vis-dash-shared.module';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

 

@NgModule({
  declarations: [
     ReusableTextInputComponent,
     DividerComponent,
     HasRoleDirective
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
     NzFormModule,
    NzInputModule,
      VisDashSharedModule // العناصر المشتركة بلوحة التحكم وبالواجهة
       
  ],
  exports: [ 
     ReactiveFormsModule,
    FormsModule,
    NzPopoverModule,
    TranslateModule, // 
    
    ReusableTextInputComponent,
    DividerComponent,
     NzFormModule,
    NzLayoutModule,
    NzMenuModule ,
    NzDrawerModule,
     NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
  
    NzRadioModule,
  
    NzListModule,
    NzGridModule,
    NzSpaceModule,
    NzUploadModule,
    
    NzDropDownModule,
    NzProgressModule,
    NzCardModule,
     NzTabsModule,
    NzSelectModule,
    NzTypographyModule,
   
    DragDropModule, 
    NzSwitchModule,
    NzTagModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzAutocompleteModule,
     NzSegmentedModule,
    HasRoleDirective,
    VisDashSharedModule
       
   
  ]
})
export class SharedModule { }

/**
 * هذا الموديل يضم ما يمكن ان تتطلبه مختلف الموديلوز وخاصة الفيوتشرز  
 * فمثلا لو عملنا مربع نص او بجنيتور او غيره قابل لاعادة الاستخدام سنضمنه بهذا الموديل كموبنتتز 
 * هنا نضمن هذه العناصر " الكوبنتتز مثلا في مصفوفة الديكلريشنز
 * ولازم نصدرها في مصفوفة الاكسبورت من اجل تقدر بقية الموديلز الفويتشرز من استخدامها
 *هذا الموديل اي الشيرد سيتم عمل له امبورت من اي فيوتشر موديل من اجل استخدام العناصر اللي عملنا لها اكسبورت
 *************
 في هذا الالموديل سنعمل مجلد كمان لل
 models
 من جل عمل اشبه بالانترفيسات اللي تضبط هيكل الكيانات المختلفة في النظام 
 *************
 هذا الموديل سيضم ايضا الموديل الخاصة بالواجهة اللي نحملها من مكتبات التصميم حيث نعمل لها امبورت ومن ثم اكسبورت
 مثل
  PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    وبالمثل كذلك الموديل مسبقة الانشاء من الانجولار ك
      ReactiveFormsModule,
    FormsModule,
    بدل نكتبها بكل موديل نحتاجها نضمنها هنا ونصدرها
    وبمجرد استيراد الشيرد يحصل عليها اي موديل او كومنبت فيها
____
علما انه ليس من الضروري ان كل موديل نصدره  نضمنه في مصفوفة imports اذا كانت عناصر الموديل لا تحتاجه هي بحد ذاتها .
مثلا اذا كانت الكومبنتس التي في Shared module   لا تحتاج FormsModule فلا داعي لتضمينه في imports  .
ونصدره فقط في حالة ان الكومبنتس في المودلز الأخرى ستحتاجها .


     */