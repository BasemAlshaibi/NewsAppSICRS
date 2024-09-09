import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, take } from 'rxjs';
import { IAuthResponse } from 'src/app/shared/models/iauth-response';
import { IUser } from 'src/app/shared/models/iuser';
import { environment } from 'src/environments/environment';
import { AccountService } from '../../account/account.service';
import { UserService } from '../user.service';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: IUser;

 
  currentUser$: IAuthResponse;
  // سنتحاج رابط الباك اند لارسال الصورة
  baseUrl = environment.apiUrl;
  editProfileForm: FormGroup;
  // errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService, private userService: UserService, private msg: NzMessageService, private titleService:Title , private translate: TranslateService) {

    this.titleService.setTitle(this.translate.instant('EditProfile.EditProfile'));

    this.intitializeForm();

    // هنا جلبنا المستخدم الحالي الاوبزرفبل من واسندناه لمتغير المستخدم من اجل التوكن 
    this.accountService.currentUser$.pipe(take(1)).subscribe(currentUser => {
      this.currentUser$ = currentUser;

    });

  }


  ngOnInit(): void {
    this.loadloadUser();
  }

  loadloadUser() {
    this.userService.getUser(this.currentUser$.userName).subscribe(user => {
      this.user = user;
      this.editProfilepatchValue(user);
    })
  }

  intitializeForm() {

    this.editProfileForm = this.fb.group({

      knownAs: [''],
      gender: [''],
      introduction: ['']

    });

  }

  editProfilepatchValue(data: IUser) {

    this.editProfileForm.patchValue({
      knownAs: data.knownAs,
      gender: data.gender,
      introduction: data.introduction
    });

  }


  submitForm(): void {
 
    this.userService.editProfile(this.editProfileForm.value).subscribe(() => {

      this.currentUser$.knownAs = this.editProfileForm.get("knownAs").value;
      this.accountService.setCurrentUser(this.currentUser$);
      this.loadloadUser();
      this.msg.success('Profile updated successfully');

    })

  }


  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.editProfileForm.reset();
    for (const key in this.editProfileForm.controls) {

      if (this.editProfileForm.controls.hasOwnProperty(key)) {
        this.editProfileForm.controls[key].markAsPristine();
        this.editProfileForm.controls[key].updateValueAndValidity();
      }
      
    }
  }

}

