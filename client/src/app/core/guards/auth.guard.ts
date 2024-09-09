import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { observable, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AccountService } from 'src/app/dashboard/account/account.service';
import { IAuthResponse } from 'src/app/shared/models/iauth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var user: IAuthResponse;

    
    return this.accountService.currentUser$.pipe(map((response: IAuthResponse) => {
      if (response) {
     
          return true;
      }

      this.router.navigate(['account/login'], { queryParams: { returnUrl: state.url } });
      return false;

  }), 
  catchError((error) => {
    this.router.navigate(['account/login'], { queryParams: { returnUrl: state.url } });
    return of(false);
  }));
 
  /*   return this.accountService.currentUser$.pipe(
      map(auth => {
 
        if (auth) {
        console.log("hii");
 
        return true;
 
        }else{
          console.log("from else");
          this.router.navigate(['account/login'], { queryParams: { returnUrl: state.url } });
      
        }

      })
    ) 
 */
 
  /*
   
    
            var user:IAuthResponse;
            this.accountService.currentUser$.subscribe(res => user = res); 
            if (user) {
              return of(true);  
              }
              this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
 
 
              

      
       
 
  */
}
}
