import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomUploadComponent } from './custom-upload/custom-upload.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AdminControllerComponent } from './admin-controller/admin-controller.component';
 

@NgModule({
  declarations: [
    EditProfileComponent,
    CustomUploadComponent,
    UsersListComponent,
    AdminControllerComponent

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
