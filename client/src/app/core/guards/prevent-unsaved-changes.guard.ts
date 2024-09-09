 import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


import { AddOrEditComponent } from 'src/app/dashboard/news/add-or-edit/add-or-edit.component';
import { UnsavedChangesConfirmService } from '../services/UnsavedChangesConfirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

   constructor(private unsavedChangesConfirmService: UnsavedChangesConfirmService) { }

  canDeactivate(component: AddOrEditComponent): Observable<boolean> | boolean {

     if (component.newsForm.dirty) {

    //  console.log(this.unsavedChangesConfirmService.confirm());
      return this.unsavedChangesConfirmService.confirm(component?.news.id,component.newsForm,component.newsImageToAdd)


    }

    return true;
  }

 
}
