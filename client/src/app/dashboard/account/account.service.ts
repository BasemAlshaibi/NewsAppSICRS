import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 import { ReplaySubject, map, of, BehaviorSubject } from 'rxjs';
import { IAuthResponse } from 'src/app/shared/models/iauth-response';
import { IRegister } from 'src/app/shared/models/iregister';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService { 

  baseUrl = environment.apiUrl;
    // هذا نوع من السبجكت يسمع في حالة انه وصله قيمه جديدة
   // private currentUserSource = new ReplaySubject<IAuthResponse>(1);
   private currentUserSource =  new BehaviorSubject<IAuthResponse | undefined>(undefined);
 
    // رقم واحد هي القيمة اللي نحن مهتمين فيها اي سجل مستخدم واحد
    // عملنا متغير كاوبزفبل وبياناته من السبجكت وسنتعامل لاحقا مع هذا المتغير في الكومبنتس
    currentUser$ = this.currentUserSource.asObservable();

   constructor(private http: HttpClient, private router: Router ) { }

   login(model: any) {
    return this.http.post<IAuthResponse>(this.baseUrl + 'account/login1', model).pipe(
      map((response: IAuthResponse) => {
        //استخدمنا الماب لاعتراض القيم المرتجعة واخذ نسخة منها
        const user = response;
        //نتحقق اذا في بيانات رجعت 

        if (user) {
  
          this.setCurrentUser(user);
 
        }
      //  في حالة انه نريد نوصل البيانات للكومبنتس اللي بايشترك بها اي في دالة السبسكرايب, في هذا فنحن بحاجة للريترن
             return user; 
              // علما انه ذا في دالة الماب لو كنا استخدمنا دالة التاب فلا حاجة للريترن وستعود البيانات للمشترك فيها

      })
    )
  }

  // في هذه الدالة نفس الخطوات اللي عملناها فوق
  // نقدر نعمل دالة هاندلر اثنتكيشن مثلما عملنا بمشروع التوكن الخاص بنا بدل تكرار لكود
  register(Registermodel: IRegister) {
    return this.http.post<IAuthResponse>(this.baseUrl + 'account/register', Registermodel).pipe(
      map((user: IAuthResponse) => {
        if (user) {
        // this.setCurrentUser(user); 
       // this.message.create('success', 'the registration was done');
       console.log("done")
        }
      })
    )
  }
  /*
   هذه الدالة تعمل عدة امور
  اولا باتاخذ المتغير اللي وصل وتروح لخاصية الرولز وتخلي قيمته الاولية فاضية
  ثم باتستدعي دالة اللي تعمل فك شفرة للتوكن وتبعث لها التوكن من المستخدم اللي جاء وتطلع منه فقط قيمة
  خاصية الرول وتخزنه بمتغير باسم رولز
  وكما نعرف فالمستخدم لو لديه رول واحدة ستعود كنص عادي ولو لديه اكثر من رول فستعود مصفوفة
  لذلك نحن بكلتا الحالتين نشتيهم يكون محفوظين معنا كمصفوفة
  ثم 
  نخزن   الاستجابة بلوكل ستوريج او البيانات اللي تصل اليها 
   وتمنح السبجكت البيانات اللي سيسمع بها 
   هذه البيانات هنا هي المرتجعة من الباك اند لما نعمل لوجن او ريجستر
   لكنها كذلك قد تاتي له من لوكل ستوريج محفوظ كما سنعرف لاحقا عند عمل اوتو لوجن
  سنستدعي هذه الدالة في الاب كومنتس لاحقا ونرسل لها المستخدم من اللوكل ستوريج 
  هذا يعني انه لما يدخل المستخدم المتصفح لو في بيانات باللوكل استوريج فلا داعي لعمل لوجن من اول وجديد
  */
  setCurrentUser(user: IAuthResponse) {

    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);

    localStorage.setItem('user', JSON.stringify(user)); // نخزن البيانات المرتجعة باللوكل ستوريج ايضا
    localStorage.setItem('token', user.token); // طريقة للاختبار فقط لسا

    this.currentUserSource.next(user); // نبثه علشان كل المشتركين يعرفوا فيه
  }

  // هذه الدالة لسا لم تختبر 
  loadCurrentUser(token: string) {

    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IAuthResponse>(this.baseUrl + 'Account/GetCurrentUser', {headers}).pipe(
      map((user: IAuthResponse) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.setCurrentUser(user);
       //   return user;
        }
      })
    )
  }


  // الدالة اللي باتعمل دي كودد للتوكن وتطلع لنا جزء الداتا منه فقط
  getDecodedToken(token:string) {
    return JSON.parse(atob(token.split('.')[1]));
/**
 *  أولا بعمل دي كودد   للتوكن  داخل الانجولار نفس بحيث نقدر نخرج الجزء الوسط فيه الخاص بالبيلوود
 * وحددنا الفاصل بالدووت لان اجزاء التوكن الثلاثة تفصل بدوت
 * البداية من الصفر وهو بالتاني لذا واحد  
 */
    //The atob() function decodes a string of data which has been encoded using Base64 encoding.
  }
  
//اذا عمل لوج اوت يصفي اللوكل استوريج ويجعل السبحكت يسمع مشتركيه بنل
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
 
  }

  checkEmailExists(email: string) {
    const headers = new HttpHeaders({ ignoreProgressBar: '' });

    return this.http.get(this.baseUrl + 'Account/emailExists?email=' + email, { headers });
  }
    
}
