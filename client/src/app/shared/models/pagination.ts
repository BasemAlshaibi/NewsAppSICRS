/**
 * بما ان الريسبونس الراجع من الباك اند يحتوي على هيدر يضم اوبجكت فيه اربعة
 * متغيرات فذا نعرف انترفيس يماثل ذلك ونسميها بجنيشن
 * ثم نعمل كلاس باسم نتيجة عملية التصفيح او الريسلت بجنيتد
 * فيه متغيرين
 * الاول باسم ريسلت وهو جنيرك من نوع المررر بين القوسين من اجل يكون مرن لاي استخدام
 * والاخر اسمه بجنيشن وهو من نوع الانترفيس الجينشن
 * 
 * 
 */

 export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}