import { IUser } from "./iuser";

 
export class UserParams {
    // محتويات الكلاس ستمثل البرميترات الخاصة التي قد يرسلها المستخدم للباك اند
    // التالي خاص بالبجنيشن
    pageIndex = 1; 
    pageSize = 20;
    search: string;

 
 // خاصة بالفرز او الترتيب والافتراضي بحسب اخر نشاط للحساب
      sort = 'lastActive';
 
 /*   constructor(user: IUser) {
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
    */
}

