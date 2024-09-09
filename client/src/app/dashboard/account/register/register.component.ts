import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, Observable, Observer, of, switchMap, timer } from 'rxjs';
import { IRegister } from 'src/app/shared/models/iregister';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];
  user: IRegister;

  passwordVisible = false;
  password?: string;

  confirmVisible = false;
  confirm?: string;




  constructor(private fb: FormBuilder, private message: NzMessageService, private accountService: AccountService, private router: Router,private location: Location, private titleService:Title , private translate: TranslateService) { 

    this.titleService.setTitle(this.translate.instant('AdminController.CreateNewUser'));
  }


  ngOnInit(): void {
    this.intitializeForm();

  }

  intitializeForm() {

    this.registerForm = this.fb.group({

      email: ['', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')], [this.validateEmailNotTaken()]],
      password: ['', 
       [
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$') //this is for the letters (both uppercase and lowercase) and numbers validation
     ]
    
    ],
      confirm: ['', [this.confirmValidator]],
      knownAs: ['', [Validators.required]],
      gender: [''],
      role: ['Author', [Validators.required]]

    });

  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  validateConfirmPassword(): void {
    setTimeout(() => this.registerForm.controls.confirm.updateValueAndValidity());
  }





  resetForm(e: MouseEvent): void { // اعمل حل
    e.preventDefault();
    this.registerForm.reset();

    
    for (const key in this.registerForm.controls) {

      if (this.registerForm.controls.hasOwnProperty(key)) {
        this.registerForm.controls[key].markAsPristine();
        this.registerForm.controls[key].updateValueAndValidity();
      }
      
    }
 
   // this.intitializeForm();

  }



  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {

      return timer(500).pipe(
        switchMap(() => {

          if (!control.value) {
            return of(null);
          }

          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? { duplicated: true } : null;
            })
          );


        })
      )


    }
  }

  submitForm(): void {

    this.user = {
      email: this.registerForm.value.email,
      knownAs: this.registerForm.value.knownAs,
      gender: this.registerForm.value.gender,
      password: this.registerForm.value.password,
      role: this.registerForm.value.role
    }

    this.accountService.register(this.user).subscribe(response => {
      this.router.navigateByUrl('/dashboard/users/usersList');
      this.message.success(this.translate.instant('AdminController.RegistrationDone'));

      
 
    }, error => {
      this.errors = error.errors;
    })


  }

  cancel() {
    this.location.back();
  }

}
