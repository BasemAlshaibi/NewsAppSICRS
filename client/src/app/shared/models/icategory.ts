import { INews } from "./inews";

export interface ICategory {
    id: number;
    name: string;
    status: boolean;
    order: number;
    nameCategoryUrl: string;
    news?: Partial<INews>[];

}

 


