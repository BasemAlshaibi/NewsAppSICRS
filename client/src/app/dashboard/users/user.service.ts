import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { getPaginatedResult, getPaginationHeaders } from 'src/app/core/Helpers/paginationHelper';
import { IAuthResponse } from 'src/app/shared/models/iauth-response';
import { IUser } from 'src/app/shared/models/iuser';
import { UserParams } from 'src/app/shared/models/userParams';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser;
  currentUser : IAuthResponse;
  baseUrl = environment.apiUrl;
  userParams: UserParams;




   
  constructor(private http: HttpClient, private accountService: AccountService) {

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.currentUser = user;
      this.userParams = new UserParams();
     })

  }
    ///////  دوال خاصة باليوزر برامس  //////////

    getUserParams() {
      return this.userParams;
    }
  
    setUserParams(params: UserParams) {
      this.userParams = params;
    }
    
    ///////////// نهاية دوال الخاصة باليوزر برامس /////////

   /////////////  دالة جلب عضو واحد////////////

   getUser(username: string) {

     return this.http.get<IUser>(this.baseUrl + 'users/GetUserByName/' + username);

 
   }
       /////////////  دالة المستخدمين وفق البرميترات المحددة    ////////////

     getUsers() {

    // في كود قبله خاص بالكاشنج لمرحلة اخيرة

    let params = getPaginationHeaders(this.userParams.pageIndex, this.userParams.pageSize);

    params = params.append('sort', this.userParams.sort.toString());

    if (this.userParams.search) {

      params = params.append('search', this.userParams.search.toString())
      // params = params.append('search', userParams.search.toString());

    } 
 
    return getPaginatedResult<IUser[]>(this.baseUrl + 'users', params ,this.http)
    .pipe(map(response => {
      // نعمل نسخة من البيانات الراجعة من الباك اند بمصفوفة الماب المعرفة بالاعلى
      // بحيث نستفيد منها في مرات اخرى ومعاد نطلب نفس البيانات مرة اخرى من الباك اند
      //   this.memberCache.set(Object.values(userParams).join('-'), response);
      return response;
    }))
    
    }


    /////////////  دالة تعديل مستخدم لبيانته  ////////////

    editProfile(user: Partial<IUser>) {
      // هنا البيانات المعدلة نرسلها للباك اند وبرضه نعدل على نفس السجل بالمصفوفة اللي مكيشة العناصر
      return this.http.put(this.baseUrl + 'Users/Update', user).pipe(
        map(() => {
        //  const index = this.members.indexOf(member);
         // this.members[index] = member;
      //   console.log("تم التعديل")
        })
      )
    }

     /////////////  دالة تعديل الأدمن لبيانات مستخدم   ////////////

     EditUserPermissions(id ,user: Partial<IUser>) {
      // هنا البيانات المعدلة نرسلها للباك اند وبرضه نعدل على نفس السجل بالمصفوفة اللي مكيشة العناصر
      return this.http.put(this.baseUrl + 'Account/AdminController/'+id , user).pipe(
        map(() => {
        //  const index = this.members.indexOf(member);
         // this.members[index] = member;
        // console.log("تم التعديل")
        })
      )
    }


      /////////////  دوال خاصة بالصور  ////////////

      setMainPhoto(photoId: number) {
        return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
      }
      
      deletePhoto(photoId: number) {
        return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
      }




}
