import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

 


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'account', // child route path
        loadChildren: () => import('../dashboard/account/account.module').then(mod => mod.AccountModule) 
      } ,
      {
        path: 'users', 
        loadChildren: () => import('../dashboard/users/users.module').then(mod => mod.UsersModule) 
      }
      ,
      {
        path: 'categories',  
        loadChildren: () => import('../dashboard/category/category.module').then(mod => mod.CategoryModule) 
      }
      ,
      {
        path: 'news',  
        loadChildren: () => import('../dashboard/news/news.module').then(mod => mod.NewsModule) 
      }
 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
