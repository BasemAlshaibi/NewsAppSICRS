export class NewsParams {

    pageIndex = 1; 
    pageSize = 20;



    search: string;
    category: string;
    categoryId: number= 0;

    createdBy:string;
     
    sort :string;

    status:string="Published";

    MinDate:string;
    maxDate :string;


    /**For vistors Pages  */

    /*
     Top :number;
    isShowInMain: boolean;
    isChooseEditor: boolean;
    isBreakingOrImportant: boolean;
*/
 
 // خاصة بالفرز او الترتيب والافتراضي بحسب اخر نشاط للحساب
  
 
 /*   constructor(user: IUser) {
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
    */
}
