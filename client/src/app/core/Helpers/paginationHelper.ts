import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../../shared/models/pagination';
 
// هنا سنعرف الدالتين مباشرة كما كنا نفعل بالدوال الخاصة بالكاستم فالديشن
// الدالتين لازم يعرفان بكلمة فنكشن وينعمل لهم اكسبورت علشان نقدر نستخدمهم باي كلاس اخر


// الدالة الاولى خاصة بحقن برميتر النفجيشن في اوبجكت من نوع اتش تي تي بي بارامز لا غير وارجاعه الاوبجكت
export function getPaginationHeaders(pageIndex: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageIndex', pageIndex.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

// الدالة الثانية خاصة بتوزيع الريسبونس على مصفوفة من نوع بجنيتد ريسلت
// ولانه  ما عندنا هنا حقن لل اتش تي بي بي كلاينت فهنا سنمرره لها كبرميتر من السيرفس

export function getPaginatedResult<T>(url, params, http: HttpClient) {

    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        // بيانات البجنيشن راجعه ضمن هيدر الريسبونس فنططلعها ونحزنها بالمصفوفة بجنيشن التي في البجنيتد ريسلت
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }