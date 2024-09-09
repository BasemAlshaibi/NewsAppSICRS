import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
//import { ToastrService } from 'ngx-toastr';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private message: NzMessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(error => {
        if (error) {
          if (error.status === 400) {

            if (error.error.errors) {
              throw error.error;
              // هنا يعني ان في اخطاء فالديشن فنمررها للكومبنت اللي تمت فيه وهناك تعرض بمصفوفة كما حصل في الريجستر

            } else {
            //  this.toastr.error(error.error.message, error.error.statusCode);
             //    console.log("هناك خطاء");
                   this.message.error( error.error.statusCode +"......"+ error.error.message);

            }
          }

          if (error.status === 401) {


            // الكود التالي مخصص في حالة غلط المستخدم بتسجيل الدخول سواء بالباسورد او الايميل فهنا المطلوب يرجع
            // رسالة بذلك الخطا دون تحويله الى صفحة النوت ايثيرويسشن
            // الرسالة سيرمي بها الى الكومبنت الخاص باللوجن فورم
            if (error.error.statusCode === 0) {
              throw error.error.message;
           }
            
          //  this.toastr.error(error.error.message, error.error.statusCode);
       //   this.message.error( error.error.statusCode +"..."+ error.error.message);
       this.router.navigateByUrl('/not-authorized');
       // هنا نعمل الريفرش توكن


          }

      

          if (error.status === 404) {

            // التشيك التالي في حالة انه الاوبجكت الراجع يحمل  حالة الكود بصفر
            // فهنا معناته اجرى بحث في صفحات الزوار ولم يجد البيانات فهنا لانريد تحويله لصفحة 404
            // وانما نريد رمي الخطا لصفحة البحث علشان يظهر رسالة مقروءه بان النتيجة لم يجدها
            if (error.error.statusCode === 0) {
              throw error.error.message;
           }

            this.router.navigateByUrl('/not-found');
          }
          if (error.status === 500) {
            const navigationExtras: NavigationExtras = {state: {error: error.error}}
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }

        return throwError(error);
      })
    )
  }
}