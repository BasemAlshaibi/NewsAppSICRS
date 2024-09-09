import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/core/services/lang.service';
import { ThemeService } from 'src/app/theme.service';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.less']
})
export class HeaderPanelComponent implements OnInit {

  @Output() isCollapsedEvent = new EventEmitter<boolean>();

  selectedLanguge = localStorage.getItem('currentLang')  || "ar";


  constructor(public accountService: AccountService, private router: Router,private themeService: ThemeService,private langService: LangService,public translate: TranslateService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
// الطريقة الثانية الخاصة بطريقة المباشرة مع التمبلت
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    htmlTag.lang = lang;
  //  this.translate.use(lang);
  this.langService.toggleLang().subscribe();

  }


 isCollapsed = false;

 toggleSlider() {
  var value =this.isCollapsed = !this.isCollapsed;
  this.isCollapsedEvent.emit(value);
}
  
  toggleTheme(): void {
      this.themeService.toggleTheme().then();
     }
      

     toggleLang(): void {
      this.langService.toggleLang().subscribe();
     }
   
     logout() {
      this.accountService.logout();
      this.router.navigateByUrl('/')
    }

}
