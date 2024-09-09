import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { NZ_I18N, en_US, ar_EG, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import ar from '@angular/common/locales/ar';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enUS,arEG } from 'date-fns/locale';

 
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { FormsModule } from '@angular/forms';
import { AppInitializerProvider } from './app-initializer.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LangService } from './core/services/lang.service';


import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

 
 


 



// التالي خاص باداة كليندر التاريخ
registerLocaleData(en);
registerLocaleData(ar);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
 

@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    NgProgressModule,
    NgProgressHttpModule,
    NzMessageModule, // مؤقت من اجل الانتسيتور

    HttpClientModule,
 
    FormsModule, // مؤقتا
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  }) // لمكتبة الترجمة


  ],
  providers: [
  {
      provide: APP_INITIALIZER,
      useFactory:(langService:LangService)=>()=>langService.loadLange(),
      deps:[LangService],
      multi:true,
  },
  AppInitializerProvider,
   //  { provide: NZ_I18N, useValue: en_US },
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          /** keep the same with angular.json/i18n/locales configuration **/
          case 'ar':
            return ar_EG;
          default:
            return en_US;
        }
      },
      deps: [LOCALE_ID]
    },
 { provide: NZ_DATE_LOCALE, useValue: arEG }, // لتضبيط التاريخ وسيكون على طول يدعم العربي - مؤقت للترجمة
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

 

