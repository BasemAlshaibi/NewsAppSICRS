import { Component, Input, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { timer, switchMap, of, map } from 'rxjs';
import { IUser } from 'src/app/shared/models/iuser';
import { AccountService } from '../../account/account.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-controller',
  templateUrl: './admin-controller.component.html',
  styleUrls: ['./admin-controller.component.scss']
})
export class AdminControllerComponent implements OnInit {
  @Input() userData?: Partial<IUser>;
  AdminControllerForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private userService: UserService,  private msg: NzMessageService, private accountService: AccountService,private modal: NzModalRef) {}

 

  ngOnInit(): void {  
  this.intitializeForm();
  this.AdminControllerPatchValue();
 
  }

  intitializeForm() {
 
    this.AdminControllerForm = this.fb.group({
      
      email: ['', [Validators.required,Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],  [this.validateEmailNotTaken()]], 
      knownAs: ['',Validators.required],
      gender: [''],
      role: ['',Validators.required],
      status:['',Validators.required]
  
    });
  
  }



  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
  
      return timer(500).pipe(
        switchMap(() => {
  
          if (!control.value  || control.value===this.userData?.email) {
            return of(null);
          }
          
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
               return res ? {duplicated: true} : null;
            })
          );
  
  
        })
      )
  
  
    }
  }

  AdminControllerPatchValue() {
 

  this.AdminControllerForm.patchValue({
    email:this.userData.email,
    knownAs: this.userData.knownAs,
    gender: this.userData.gender,
    role:this.userData.role,
    status:this.userData.status    
  });
 

  }


  submitForm(): void {
 
    this.userService.EditUserPermissions(this.userData.id,this.AdminControllerForm.value).subscribe(() => {
    
      this.msg.success('User Data updated successfully');
    //  this.modal.destroy({ resultData: 'this the result data' });
    this.modal.destroy();

  
    })

  }
//

 
 

  Cancel(){
    this.modal.destroy();
   //this.modal.destroy({ resultData: 'this the result data' });

  }
 

}
