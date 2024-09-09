import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { getPaginatedResult, getPaginationHeaders } from 'src/app/core/Helpers/paginationHelper';
import { CategoryParams } from 'src/app/shared/models/category-params';
import { ICategory } from 'src/app/shared/models/icategory';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  baseUrl = environment.apiUrl;
  categoryParams: CategoryParams;


  constructor(private http: HttpClient) {

    this.categoryParams = new CategoryParams();
  }

  ///////  دوال خاصة بالكاتجري برامس  //////////

  getCategoryParams() {
    return this.categoryParams;
  }

  setCategoryParams(params: CategoryParams) {
    this.categoryParams = params;
  }

  ///////////// نهاية دوال الخاصة بالكاتجري برامس /////////
  getCategories() {

/* 
الكود التالي يخص جلب التصنيفات مع ترقيم الصفحات وهذا غير مفعل بالباك اند
  //  let params = getPaginationHeaders(this.categoryParams.pageIndex, this.categoryParams.pageSize);

    //params = params.append('sort', this.categoryParams.sort.toString());
    return getPaginatedResult<ICategory[]>(this.baseUrl + 'Categories', params, this.http)
      .pipe(map(response => {
        //   console.log(response);

        return response;
      }))
*/

return this.http.get<ICategory[]>(this.baseUrl + 'GetCategoriesWithSpecWithoutPaging').pipe(map(response => {
  //   console.log(response);
  return response;
}))

}
  
  ///////////// نهاية دوال الخاصة بالكاتجري برامس /////////
  UpdateAllCategories(categories:ICategory[]) {
 
    return this.http.put(this.baseUrl + 'Category/UpdateAll', categories).pipe(
      map(() => {
    //ant thing
      })
    )

  }


}
