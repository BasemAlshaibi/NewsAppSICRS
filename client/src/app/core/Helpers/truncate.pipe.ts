import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 50, completeWords = true, ellipsis = '...') {
    if (completeWords) {
      //   limit = value.substr(0, limit).lastIndexOf(' ');
      if (value.length < limit) { return value; }
      else {
        limit = value.substr(0, limit).lastIndexOf(' '); // بايخذ رقم آخر سبيس في النص اللي ضمن المدى المطلوب
        return value.substr(0, limit) + ellipsis ; //  هنا سياخذ القطعة النصية من البداية حتى يجد اخر سبيس ضمن المدى المطلوب ثم يضيف لها نقاط 
      }
     }

  }
}

//https://stackoverflow.com/questions/44669340/how-to-truncate-text-in-angular2
/**
 * 
 *   <h1>{{longStr | truncate }}</h1> 
  <!-- Outputs: A really long string that... -->

  <h1>{{longStr | truncate : 12 }}</h1> 
  <!-- Outputs: A really lon... -->

  <h1>{{longStr | truncate : 12 : true }}</h1> 
  <!-- Outputs: A really... -->

  <h1>{{longStr | truncate : 12 : false : '***' }}</h1> 
  <!-- Outputs: A really lon*** -->
 */