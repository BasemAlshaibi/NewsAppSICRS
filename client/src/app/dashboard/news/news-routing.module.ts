import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreventUnsavedChangesGuard } from 'src/app/core/guards/prevent-unsaved-changes.guard';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [
  {path: 'newsList', component: NewsListComponent},
 // {path: 'addOrEdit/:id', component: AddOrEditComponent},

  {path:'addOrEdit',children:[
    {path:'',component:AddOrEditComponent , canDeactivate: [PreventUnsavedChangesGuard]},  
    {path:':id',component:AddOrEditComponent, canDeactivate: [PreventUnsavedChangesGuard]}
  ]}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }


