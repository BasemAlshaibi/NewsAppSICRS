import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from 'src/app/dashboard/account/account.service';
import { IAuthResponse } from 'src/app/shared/models/iauth-response';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    let currentUser: IAuthResponse;
    // هنا سنصل الى الاوبزرفبل الخاص ببيانات المستخدم
    // دالة التيك علشان تعمل انسبسكرايب تلقائي بعد اخذ القيمة
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
        if (currentUser) {
          // لو وجدنا قيمة اي انه في تسجيل بعض التوكن بنسخة من الريكوست
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${currentUser.token}` 
          
               
            }
          })
        }
    // مالم يبعث الريكوست الاصلي بدون توكن
        return next.handle(request);

/*
    const token = localStorage.getItem('token');

    if (token) {
        req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    return next.handle(req);

    */
  }
}