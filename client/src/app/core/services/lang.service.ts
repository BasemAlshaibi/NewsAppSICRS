import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

 
@Injectable({
  providedIn: 'root'
})
export class LangService {

 // currentLang= LangType.Arabic;

currentLang : string;
//private renderer: Renderer2,
constructor(@Inject(DOCUMENT) private document: Document,  public translateService: TranslateService)
{
    this.currentLang =  localStorage.getItem('currentLang')  || "ar";
}

 


  // reverse language
  private reverseLang(lang: string): string {
    return lang === "en" ? "ar" : "en";
  }



  public loadLange(firstLoad = true):Observable<void> {


    return new Observable((subscriber) => {

      if (firstLoad) {
        this.changelangAndDirHtmlTag(this.currentLang);
        // this.changeCssFile(this.currentLang);
        this.translateService.use(this.currentLang)

      } else {

        localStorage.setItem("currentLang", this.currentLang);
        this.changelangAndDirHtmlTag(this.currentLang);
        // this.changeCssFile(this.currentLang);
        this.translateService.use(this.currentLang)
      }
      subscriber.complete();
    });
  }

    //toggle Lang

    public toggleLang() :Observable<void> {
      this.currentLang = this.reverseLang(this.currentLang);
      return this.loadLange(false);
    }


  ///////////
/*
  changeLangage(language: string) {

    this.changelangAndDirHtmlTag(language) // نستدعي هذه الدالة ونمرر لها قيمة اللغة المختارة


    this.translateService.use(language);// نختار ملف الترجمة بحسب اللغة المختارة 
    //  this.translate.setDefaultLang(language);
    localStorage.setItem("currentLang", language); // نخزنها باللوكل ستوريج ليتذكرها المتصفح بالمرات القادمة لفتحه
    this.changeCssFile(language);
  }
*/
  
  // بداية دالة تغيير ملف السي اس اس
  changeCssFile(language: string) {

    /* المطلوب انشاء هذا الوسم لاحقة في جزء الهيد بحسب اللغة المختارة يحمل ملف التنسيق المطلوب لها
    بحيث يكون على هذا الشكل
    <link rel="stylesheet" type="text/css" id="langCss" href="englishStyle.css">
 */
    /* اول خطوة هنا نتحقق هل هناك تاج لينك تم اضافته  .. اي سبق وان غيرت اللغة وانشئ الوسم
      في حالة وجوده سنعرف ذلك من خلال الخاصية الاي دي فيه 
      في حالة وجوده نجلب العنصر هذا ونسند للخاصية اتش رف الكلاس المناسب بحسب اللغة
      ولمعرفة الكلاس المناسب نفحص القيمة المرسلة للدالة فلو عربي نجعل قيمة البندل نيم هو اسم الكلاس العربي والعكس باللغة الانجليزية
       */
    let existingLink = this.document.getElementById("langCss") as HTMLLinkElement;
    // هذه الاسماء للبندل نيم مضبطة في ملف الاجولار جيسون بالاعدادات
    let bundleName = language === "ar" ? "arabicStyle.css" : "englishStyle.css";

    // الطريقة الاولى

    if (existingLink) {
      existingLink.href = bundleName;
    } else {
      let headTag = this.document.getElementsByTagName("head")[0] as HTMLHeadElement;
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.type = "text/css";
      newLink.id = "langCss";
      newLink.href = bundleName;
      headTag.appendChild(newLink);
    }


    /* الطريقة الثانية
  تعمل نفس عمل الطريقة الاولى ولكن باستخدام الريندر/
     اذا اردنا نعمل بها فنبدل الكود التالي بدل شبيهه بالكود اعلاه .. اي من جملة الشرط 

     */
    /*
        if (existingLink) {
          existingLink.href = bundleName;
        } else {
          const newLink = this.renderer.createElement('link');
          this.renderer.setAttribute(newLink, 'rel', 'stylesheet');
          this.renderer.setAttribute(newLink, 'type', 'text/css');
          this.renderer.setAttribute(newLink, 'id', 'langCss');
          this.renderer.setAttribute(newLink, 'href', bundleName);
          this.renderer.appendChild(document.head, newLink);
          //  this.renderer.removeChild(document.head, newLink)
        }
    */


  }

  changelangAndDirHtmlTag(language: string) {

    /*  الكود المتعلق بتغيير الاتجاه واللغة في وسم الهتمل الرئيسي كما في الوسم التالي  */
    // <html lang="ar" dir="rtl">
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = language === "ar" ? "rtl" : "ltr";
    htmlTag.lang = language === "ar" ? "ar" : "en";
  }


}
