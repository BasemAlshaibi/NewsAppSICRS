import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { INews, INewsImageAdd } from 'src/app/shared/models/inews';
import { environment } from 'src/environments/environment';
import { NewsService } from '../news.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-image-news-uploader',
  templateUrl: './image-news-uploader.component.html',
  styleUrls: ['./image-news-uploader.component.less']
})
export class ImageNewsUploaderComponent implements OnInit {

  @Input() news: INews;
  @Output() newsImageToAddEvent = new EventEmitter<INewsImageAdd[]>();

  fileList: NzUploadFile[] = [];
  baseUrl = environment.apiUrl;//https://localhost:5001/api/
  //apiForImageUrl = environment.apiForImageUrl;//https://localhost:5001 // الغيت موقتا للملاحظة
  apiForImageUrlResonseAdd = environment.apiForImageUrlResonseAdd;//https://localhost:5001/Content
  authToken: string;
  newsImageToAdd: INewsImageAdd[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

 


  constructor(private http: HttpClient, private modal: NzModalService, private msg: NzMessageService, private newsService: NewsService,private translate: TranslateService) { }

  ngOnInit(): void {
    this.initializeUploader();
  }

  initializeUploader() {

    const newsPhoto: NzUploadFile[] = this.news.newsImages.map(img => ({
      url: img.fullscreenUrl,
      name: img.fullscreenUrl,
      thumbUrl: img.thumbnailUrl,
      isMain: img.isMain,
      parentId: this.news.id,
      uid: img.id.toString()
    }));

    this.fileList = newsPhoto;
  }

  /////////////  Custom http Request ////////////

  setMediaUploadHeaders = (file: NzUploadFile) => {
    return {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
      "authorization": this.authToken // نجلبة من المستخدم لاحقا لا ننسى
    }
  };

  customUploadReq = (item) => {


    const formData = new FormData();
    formData.append('images', item.file as any); // tslint:disable-next-line:no-any//images[]

    /*   item.forEach((item: any) => {
          formData.append('images[]', item.file);
        });
*/
    ///formData.append('id', '1000');
    //,item.action
    // هنا نضبط الرابط حق دالة تحميل الصورة بالباك اند وهل مع اي دي او بدون  وبدون تعني انه يتم تحميل الصورة لخبر لسا لم يحفظ بدالتا بيز وليس اضافة صورة لخبر موجود
    const UploadImagesEndUrl = this.news.id ? this.baseUrl + "News/UploadImages/" + this.news.id : this.baseUrl + "News/UploadImages";
    const req = new HttpRequest('POST', UploadImagesEndUrl, formData, {
      reportProgress: true,
      withCredentials: false
    });

    // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time
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
    }, (err) => { /* error */
      item.onError(err, item.file);
    });
  }


  /////////////  End Custom Request ////////////

  handleChange(info: NzUploadChangeParam): void {
    //***** هنا الكود الخاص بالتحكم بمراحل التحميل بحسب حالته**** */
    // نقدر نعملها كذلك ب الاف كونديشن بدون مشاكل ايضا

    //
    let fileListTemep = [...info.fileList];

    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':

        this.newsImageToAdd.push(info.file.response);
        this.newsImageToAdd = [].concat(...[...this.newsImageToAdd]);
        this.newsImageToAddEvent.emit(this.newsImageToAdd);


        fileListTemep.map(FL => {

          const responseObj = FL.response?.reduce((acc, cur) => ({
            ...acc,
            "url": this.apiForImageUrlResonseAdd + cur.url,
            "uid": cur.id,
            "isMain": cur.isMain,
            "parentId": cur.newsId,
            "folder": cur.folder
          }), {})

          if (FL.response) {
            FL.uid = responseObj.uid;
            FL.url =  responseObj.url;
            FL.isMain = false; //responseObj.isMain; // لسا بحاجة لمعالجة
            FL.parentId = responseObj.parentId;
            FL.folder = responseObj.folder;

          }
          return FL;
        });

        fileListTemep.forEach(element => {

          if (element.isMain) {
        //    console.log("هناك عنصر فيه ترو");

          } else {
            fileListTemep[0].isMain = true;
            fileListTemep[0].response?.forEach(res => { res.isMain = true });
          }

        });
        this.msg.success(this.translate.instant('imageUploader.uploadedSuccessfully', {fileName: info.file.name}));
        break;
      case 'error':
        this.msg.error(this.translate.instant('imageUploader.uploadedFailed', {fileName: info.file.name}));
        break;
    }

    this.fileList = fileListTemep;

  }


  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>

    new Observable((observer: Observer<boolean>) => {
      // Judgment on the upload file type
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error(this.translate.instant('imageUploader.isJpgOrPng'));
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
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error(this.translate.instant('imageUploader.isLt2M'));
        observer.complete();
        return;
        //return false;
      }

      // this.fileList = this.fileList.concat(file); // مؤقتا
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();

    });
  // دالة الحذف

  handleRemove(file: NzUploadFile, e: Event): void {

    e.preventDefault();

    this.modal.confirm({

      nzTitle: this.translate.instant('imageUploader.modalConfirmDelete'),
      nzOkText: this.translate.instant('imageUploader.Yes'),
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {

        this.newsService.deleteNewsPhoto(file.uid, btoa(file.folder), file.parentId).subscribe(() => {
          this.news.newsImages = this.news.newsImages.filter(x => x.id !== file.uid);
          this.fileList = this.fileList.filter(x => x.uid !== file.uid);
          this.newsImageToAdd = this.newsImageToAdd.filter(x => x.id !== file.uid);

          this.newsImageToAddEvent.emit(this.newsImageToAdd);

          this.msg.info( this.translate.instant('imageUploader.SuccessfullyDeletedImage'));

        });

      },
      nzCancelText:  this.translate.instant('imageUploader.No'),
      nzOnCancel: () => { }
    });


  }



  handleCheck(file: NzUploadFile) {

    if (file.isMain) {
      this.msg.error('الصورة المختارة هي بالفعل الصورة الرئيسية ');
    }
    else {

      if (this.news.id) {

        // هنا سيتم تعديل اختيار الصورة الرئيسية في الداتا بيز وفي الداتا لست لاننا في مرحلة تعديل
        this.newsService.setMainNewsPhoto(file.parentId, file.uid).subscribe(() => {
          // الان بعد تحميل الصورة سنقوم بتحديثات لخاصية رابط الصورة الاساسية التي بمصفوفة الممبر
          // وكذلك سنعمل لووب في النسخة المحفوظة او المكيشة لدينا بانه يبعد الصورة القديمة الاساسية
          // ويعين الجديدة بحسب الاي دي اللي تم النقر عليه للصورة الجديدة

          this.news.photoUrlThumbnail = file.url;

          this.news.newsImages.forEach(p => {
            if (p.isMain) p.isMain = false;
            if (p.id === file.uid) p.isMain = true;
          })


          this.fileList.forEach(p => {
            if (p.isMain) p.isMain = false;
            if (p.uid === file.uid) p.isMain = true;
          })

        


        })

      } else {
        // هنا التعديل لاختيار الصورة سيكون فقط في الداتا لست لاننا في مرحلة اضافة

        this.fileList.forEach(p => {
          if (p.isMain) p.isMain = false;
          if (p.uid === file.uid) p.isMain = true;
        })

        this.newsImageToAdd.forEach(p => {
          if (p.isMain) p.isMain = false;
          if (p.id === file.uid) p.isMain = true;
        })

 
        this.newsImageToAddEvent.emit(this.newsImageToAdd);
        
      }



    }



  };

  async handlePreview(file: NzUploadFile): Promise<void> {

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }

    this.previewImage = file.url || file.preview;
    this.previewVisible = true;

  };
/*
  // دالة اخرى ليست المستخدمة في الدالة السابقة
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

*/
}
