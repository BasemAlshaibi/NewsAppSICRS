import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {path: 'editProfile', component: EditProfileComponent} ,
  {path: 'usersList', component: UsersListComponent}
 ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
