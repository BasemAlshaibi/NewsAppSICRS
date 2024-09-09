import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from '../core/Helpers/paginationHelper';
 
 import { ICategory } from '../shared/models/icategory';
 import { INews } from '../shared/models/inews';
 import { NewsParams } from '../shared/models/news-params';
 
@Injectable({
  providedIn: 'root'
})
export class VisitorsPagesService {

  baseUrl = environment.apiUrl;
  newParams: NewsParams;
 
  // متغيرات للكاشنج
  newsCache = new Map(); // للكاشنج بالبرميترات -- اللسته
  news: Partial<INews>[] = [];  // للكاشنج الفردي

  categoriesCache = new Map();

  articlesCache = new Map();  
   
  videosCache = new Map();  
 
  galleriesCache = new Map();  
 






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
 

/*/ News*/

 getLastNews(top:number){
  
  var response = this.newsCache.get(`getLastNews-${top}-Published`);
  if (response) return of(response);  

  return this.http.get<Partial<INews>[]>(this.baseUrl + `News/GetNewsWithSpecWithoutPaging?Top=${top}&Status=Published`).pipe(map(response => {
    this.newsCache.set(`getLastNews-${top}-Published`, response);
    return response;
  }));
 }


 getMainNews(){

  var response = this.newsCache.get(`getMainNews-5-Published-true`);
  if (response) return of(response);  

  return this.http.get<Partial<INews>[]>(this.baseUrl + 'News/GetNewsWithSpecWithoutPaging?Top=5&Status=Published&isShowInMain=true').pipe(map(response => {
    this.newsCache.set(`getMainNews-5-Published-true`, response);
    return response;
  }));
 }

  getEditorChoiceNews(top:number){

    var response = this.newsCache.get(`getEditorChoiceNews-${top}-Published-true`);
    if (response) return of(response);  

  return this.http.get<Partial<INews>[]>(this.baseUrl + `News/GetNewsWithSpecWithoutPaging?Top=${top}&Status=Published&isChooseEditor=true`).pipe(map(response => {
     this.newsCache.set(`getEditorChoiceNews-${top}-Published-true`, response);
 
    return response;
  }));
 }





 getNewsForCategory(){ 

  
  let params = getPaginationHeaders(this.newParams.pageIndex, this.newParams.pageSize);

  params = params.append('Status', "Published") 
 
  if (this.newParams.categoryId !== 0) {
    params = params.append('CategoryId', this.newParams.categoryId.toString())
  }

  if (this.newParams.search) {
    params = params.append('Search', this.newParams.search);
  }
 
  var response = this.newsCache.get(Object.values(this.newParams).join('-'));
    if (response) {
    return of(response);
  } 

  return getPaginatedResult<INews[]>(this.baseUrl + 'News/GetNewsWithSpecWithPagingToVistors', params, this.http)
    .pipe(map(response => {
      this.newsCache.set(Object.values(this.newParams).join('-'), response);
      return response;
    }))
 }


 

 getNewsDetails(id: number): Observable<Partial<INews>> {

  const news = this.news.find(x => x.id === id);
  if (news !== undefined) return of(news);

 
  return this.http.get<Partial<INews>>(this.baseUrl + 'News/GetNewsDetailsForVisitorsById/' + id).pipe(map(response => {
    this.news=[...this.news,response];
  
     return response;
  }));

}

/*/ getNewsForCategoriesSectionsHomePage*/
getNewsForCategoriesSectionsHomePage(){

  var response = this.categoriesCache.get("getNewsForCategoriesSectionsHomePage");
  if (response) return of(response); 
  
  return this.http.get<Partial<ICategory>[]>(this.baseUrl + `GetCategoriesNewsWithSpec?isActive=true`).pipe(map(response => {
    this.categoriesCache.set("getNewsForCategoriesSectionsHomePage", response);
    return response;
  }));

 }

 getCategoriesForNavBar() {

  var response = this.categoriesCache.get("getCategoriesForNavBar");
  if (response) return of(response); 

  return this.http.get<Partial<ICategory>[]>(this.baseUrl + 'GetCategoriesWithSpecWithoutPaging?isActive=true').pipe(map(response => {
    this.categoriesCache.set("getCategoriesForNavBar", response);
    return response;
  }));

 
}


}
