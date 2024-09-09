import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  returnUrl: string;

  constructor(private fb: FormBuilder, private accountService: AccountService,private message: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute, private titleService:Title ) { 
    
    this.titleService.setTitle( 'Login'); }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email,Validators.required]],
      Password: [null, [Validators.required]],
      //  remember: [true]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/dashboard';


  }

  Login(): void {
    if (this.validateForm.valid) {

      this.accountService.login(this.validateForm.value).subscribe(response => {
 
        this.router.navigateByUrl(this.returnUrl);
        this.message.success(`Welcome Back ... ${response.knownAs || response.userName }`, {
          nzDuration: 2000
        });

      }, error => {
       
        this.validateForm.reset();
       this.message.error(`${error}`, {nzDuration: 2000});
        console.log(error) // مؤقت
      })

    } else {  
   

      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }




}


