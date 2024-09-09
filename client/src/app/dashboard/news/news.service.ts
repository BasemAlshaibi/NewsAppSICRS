import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getPaginatedResult, getPaginationHeaders } from 'src/app/core/Helpers/paginationHelper';
import { INews } from 'src/app/shared/models/inews';
import { NewsParams } from 'src/app/shared/models/news-params';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  baseUrl = environment.apiUrl;
  newParams: NewsParams;


  constructor(private http: HttpClient) {

    this.newParams = new NewsParams();
  }

  ///////  دوال خاصة بالنيوز  برامس  //////////

  getNewsParams() {
    return this.newParams;
  }

  setNewsParams(params: NewsParams) {
    this.newParams = params;
  }

  getAllNews() {

    // في كود قبله خاص بالكاشنج لمرحلة اخيرة

    let params = getPaginationHeaders(this.newParams.pageIndex, this.newParams.pageSize);

    if (this.newParams.status) {
      params = params.append('Status', this.newParams.status.toString())
    }

    if (this.newParams.search) {
      params = params.append('Search', this.newParams.search);
    }
    if (this.newParams.category) {
      params = params.append('Category', this.newParams.category);
    }

    if (this.newParams.createdBy) {
      params = params.append('CreatedBy', this.newParams.createdBy);

    }
    if (this.newParams.MinDate) {
      params = params.append('MinDate', this.newParams.MinDate);
    }

    if (this.newParams.maxDate) {
      params = params.append('MaxDate', this.newParams.maxDate);
    }
    if (this.newParams.sort) {
      params = params.append('sort', this.newParams.sort);
    }


    return getPaginatedResult<INews[]>(this.baseUrl + 'News', params, this.http)
      .pipe(map(response => {
        //   console.log(response);
        return response;
      }))

  }

  /// جلب خبر واحد

  getOneNews(id: number): Observable<INews> {

    return this.http.get<INews>(this.baseUrl + 'News/' + id);

  }


  //////////////
// دالة اضافة خبر
addNews(news : Partial<INews>){
  return this.http.post(this.baseUrl + 'News/Add' , news).pipe(
    map(() => {
      //  const index = this.members.indexOf(member);
      // this.members[index] = member;
      //   console.log("تم الاضافة")
    })
  )
}



   // دالة تعديل خبر
  updateNews(id: number,news : Partial<INews>){
    return this.http.put(this.baseUrl + 'News/Update/' + id , news).pipe(
      map(() => {
        //  const index = this.members.indexOf(member);
        // this.members[index] = member;
        //   console.log("تم التعديل")
      })
    )
  
  }

  /////////////  دالة تعديل حالة الخبر   ////////////

  changeNewsStatus(id: number, command: String) {
    // هنا البيانات المعدلة نرسلها للباك اند وبرضه نعدل على نفس السجل بالمصفوفة اللي مكيشة العناصر
    return this.http.put(this.baseUrl + 'News/changeNewsStatus/' + id + '?command=' + command, {}).pipe(
      map(() => {
        //  const index = this.members.indexOf(member);
        // this.members[index] = member;
        //   console.log("تم التعديل")
      })
    )
  }

  /////////////  دالة حذف مسودة الخبر ر   ////////////

  deleteDraftNews(id: Number) {
    // هنا البيانات المعدلة نرسلها للباك اند وبرضه نعدل على نفس السجل بالمصفوفة اللي مكيشة العناصر
    return this.http.delete(this.baseUrl + 'News/deleteDraftNews/' + id, {}).pipe(
      map(() => {
        //  const index = this.members.indexOf(member);
        // this.members[index] = member;
        //   console.log("تم التعديل")
      })
    )
  }


  // دالة حذف الصورة
  deleteNewsPhoto(photoId: string ,folder: string, newsId: number) {

    var url = newsId ==null ? `${this.baseUrl}News/delete-photo/${photoId}/${folder}` : `${this.baseUrl}News/delete-photo/${photoId}/${folder}/${newsId}` ;
    
    
    return this.http.delete(url);
  }

  // دالة تثبيت الصورة الاساسية للخبر
  setMainNewsPhoto(newsId: number, photoId: string) {
    return this.http.put(`${this.baseUrl}News/set-main-photo/${newsId}/${photoId}`, {});

  }

}
