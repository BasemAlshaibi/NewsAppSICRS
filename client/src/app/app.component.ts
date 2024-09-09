import ar from '@angular/common/locales/ar';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { NzI18nService, en_US, ar_EG } from 'ng-zorro-antd/i18n';
 import { AccountService } from './dashboard/account/account.service';
import { IAuthResponse } from './shared/models/iauth-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private accountService: AccountService,private i18n: NzI18nService,translate: TranslateService,private titleService:Title) {

    //document.dir = "ltr";

    //this.titleService.setTitle("صقور الجنوب  | الرئيسية");


   }


 

  ngOnInit() {
   this.setCurrentUser();
   this.switchLanguage();
    //  this.loadCurrentUser(); طريقة افضل اختبرها
    //moment.locale('ar'); // تخص اعتماد اللوكيل العربي في مكتبة المومينت الخاصة بالزمن
    moment.locale('en'); // تخص اعتماد اللوكيل العربي في مكتبة المومينت الخاصة بالزمن


  }

  setCurrentUser() {
    const user: IAuthResponse = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.accountService.setCurrentUser(user);
    }

  }


  loadCurrentUser() {
    const token = localStorage.getItem('token');

    this.accountService.loadCurrentUser(token).subscribe({ error: console.error }); // لانه مافيش شيء بايرجع
  }

// خاص باللغة بمكتب انج زيرو 
  switchLanguage() {
    // باتتغير بشك ديناميكي لاحقا
    this.i18n.setLocale(ar_EG);
 
  }

}
