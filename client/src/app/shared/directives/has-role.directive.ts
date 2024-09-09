import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { AccountService } from 'src/app/dashboard/account/account.service';
import { IAuthResponse } from '../models/iauth-response';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  @Input() appHasRole: string[]; // قيم مصفوفة نحصل عليها من الدايركتف كمدخلات 
  user: IAuthResponse; // سنخزن به بيانات السمتخدم الحالي ونحصل عليها من الاكاونت سيرفس

  // نعمل حقن للاكاونت سيرفس والاهم نعمل حقن لكلاسين يمثلان العنصر اللي بانتحكم في عناصره بالقالب 
 // اي حاوية العنصر وما داخله
  constructor(private viewContainerRef: ViewContainerRef, 
    private templateRef: TemplateRef<any>, 
    private accountService: AccountService) {

      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })


     }

  ngOnInit(): void {
    // clear view if no roles
    if (!this.user?.roles || this.user == null) {
      // الان في حالة انه مافي مستخدم عامل تسجيل من اصله فنخفي العنصر اي نعمل له مسح من الدووم
      this.viewContainerRef.clear();
      return;
    }
// مالم نتحقق بين ما لدى المستخدم الحالي للنظام وبين ما تم بعثه كانبوت من الدايركتف
    if (this.user?.roles.some(r  => this.appHasRole.includes(r))) {
      // فاذا في تطابق فننشى العنصر في الحاوية ونظهره له مالم نعمل له مسح
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
