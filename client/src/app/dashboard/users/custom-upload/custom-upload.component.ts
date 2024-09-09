import { trigger, transition, style, animate, keyframes, query, stagger, group } from '@angular/animations';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable, Observer, take } from 'rxjs';
import { AccountService } from 'src/app/dashboard/account/account.service';
import { UserService } from 'src/app/dashboard/users/user.service';
import { IAuthResponse } from 'src/app/shared/models/iauth-response';
import { IUser } from 'src/app/shared/models/iuser';
import { environment } from 'src/environments/environment';
 

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-custom-upload',
  templateUrl: './custom-upload.component.html',
  styleUrls: ['./custom-upload.component.less'],
  animations: [
    trigger('itemState', [
 
      
     transition('* => *', [

 
        query(':enter', [style({ opacity: 0 }), stagger('300ms', animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
          ])) )], {optional: true}),
    
          query(':leave', stagger('300ms', [
            animate('1s ease-in', keyframes([
              style({opacity: 1, transform: 'translateX(0)', offset: 0}),
              style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
              style({opacity: 0, transform: 'translateX(-75%)',     offset: 1.0}),
            ]))]), {optional: true})
      ])  
       
    ])
  ],
})

export class CustomUploadComponent implements OnInit {

  @Input() user: IUser;
  currentUser$:IAuthResponse;


 // user: IAuthResponse;
  // سنتحاج رابط الباك اند لارسال الصورة
  baseUrl = environment.apiUrl;
  authToken: string;
  url: string=this.baseUrl + 'Users/add-photo';
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;


  constructor(private accountService: AccountService,private http: HttpClient, private modal: NzModalService, private userService: UserService, private msg: NzMessageService ) {

     this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
       this.currentUser$=user;
        this.authToken = 'Bearer ' + user.token;
    });


  }
  ngOnInit(): void {
    this.initializeUploader();
   }

  initializeUploader() {

    const userPhoto: NzUploadFile[] = this.user.UserPhotos.map(img => ({
      url: img.url,
      name: img.url,
      isMain: img.isMain,
      uid: img.id.toString()
    }));

    this.fileList = userPhoto;
  }

        /////////////  Custom http Request ////////////

      setMediaUploadHeaders = (file: NzUploadFile) => {
          return {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "authorization":this.authToken
          }
      };

        customUploadReq = (item) => {

          const formData = new FormData();
          formData.append('file', item.file as any); // tslint:disable-next-line:no-any
          ///formData.append('id', '1000');
          //,item.action
          const req = new HttpRequest('POST', this.baseUrl + "Users/add-photo", formData, {
            reportProgress : true,
            withCredentials: false
          });

          // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time
         return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
            if (event.type === HttpEventType.UploadProgress) {
              if (event.total > 0) {
                 (event as any).percent = event.loaded / event.total * 100; // tslint:disable-next-line:no-any
              }
              // To process the upload progress bar, you must specify the `percent` attribute to indicate progress.
              item.onProgress(event, item.file);
            } else if (event instanceof HttpResponse) { /* success */
              item.onSuccess(event.body, item.file, event);
            }
          },(err) => { /* error */
            item.onError(err, item.file);
          });
        }


       /////////////  End Custom Request ////////////



  handleChange(info: NzUploadChangeParam): void {
    //***** هنا الكود الخاص بالتحكم بمراحل التحميل بحسب حالته**** */
    // نقدر نعملها كذلك ب الاف كونديشن بدون مشاكل ايضا

    let fileListTemep = [...info.fileList];

    switch (info.file.status) {
      case 'uploading':
         break;
      case 'done':
        this.user.UserPhotos.push(info.file.response); // هذا تغير
        this.accountService.setCurrentUser(this.currentUser$);

         fileListTemep.map(file => {

          if (file.response) {
            file.uid = file.response.id.toString();
            file.url = file.response.url;
            file.isMain = file.response.isMain;
          }

          return file;
        });


        this.msg.success(`${info.file.name} file uploaded successfully`);
        break;
      case 'error':
        this.msg.error(`${info.file.name} file upload failed.`);
        break;
    }

    this.fileList = fileListTemep;



  }


  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>

    new Observable((observer: Observer<boolean>) => {

      // Judgment on the upload file type
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG or Png file!');
        observer.complete();
        return;
      }
      /**
       * // or in anothr way
       * 
      const type = file.type;
  
      const str = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];
  
      if (str.indexOf(type) < 0) {
        this.msg.error('Select file failed, only pdf, jpg, jpeg, png and other formats are supported');
        return false;
      }
      
       */


      // Limit on upload file size
      const isLt2M = file.size! / 1024 / 1024 < 4;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
        //return false;
      }

      // this.fileList = this.fileList.concat(file); // مؤقتا
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();

    });


  handleRemove(file: NzUploadFile, e: Event): void {

    e.preventDefault(); // تحت الاختبار

    this.modal.confirm({

      nzTitle: 'Are you sure delete this Image?',
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {

        this.userService.deletePhoto(+file.uid).subscribe(() => {
          this.user.UserPhotos = this.user.UserPhotos.filter(x => x.id !== +file.uid);
          this.fileList = this.fileList.filter(x => x.uid !== file.uid);
          this.accountService.setCurrentUser(this.currentUser$);
          this.msg.error('تم حذف الصورة');

        });

      },
      nzCancelText: 'No',
      nzOnCancel: () => {}
    });




  }



  handleCheck(file: NzUploadFile) {

    if (file.isMain) {
      this.msg.error('الصورة المختارة هي بالفعل الصورة الرئيسية ');
    }
    else {

      this.userService.setMainPhoto(+ file.uid).subscribe(() => {
        // الان بعد تحميل الصورة سنقوم بتحديثات لخاصية رابط الصورة الاساسية التي بمصفوفة الممبر
        // وكذلك سنعمل لووب في النسخة المحفوظة او المكيشة لدينا بانه يبعد الصورة القديمة الاساسية
        // ويعين الجديدة بحسب الاي دي اللي تم النقر عليه للصورة الجديدة
        this.currentUser$.photoUrl = file.url;
        this.accountService.setCurrentUser(this.currentUser$);

        this.user.photoUrl = file.url;
        this.user.UserPhotos.forEach(p => {
          if (p.isMain) p.isMain = false;
          if (p.id === +file.uid) p.isMain = true;
        })

  
        this.fileList.forEach(p => {
          if (p.isMain) p.isMain = false;
          if (p.uid === file.uid) p.isMain = true;
        })

      })
    }



  };

  async handlePreview(file: NzUploadFile): Promise<void> {


    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }

    this.previewImage = file.url || file.preview;
    this.previewVisible = true;

  };

}
