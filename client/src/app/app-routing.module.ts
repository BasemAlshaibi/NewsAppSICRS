import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotAuthorizedComponent } from './core/not-authorized/not-authorized.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
 
const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./visitorsPages/visitors-pages.module').then(mod => mod.VisitorsPagesModule) 
  },
   { path: 'test-error', component: TestErrorComponent }, 
  { path: 'server-error', component: ServerErrorComponent  },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'not-found', component: NotFoundComponent  },  

  {
    path: 'dashboard', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule) 
  },
  {
    path: 'account',
     loadChildren: () => import('./dashboard/account/account.module').then(mod => mod.AccountModule) 
  },
  {
    path: '', 
     loadChildren: () => import('./visitorsPages/visitors-pages.module').then(mod => mod.VisitorsPagesModule) 
  },
  {path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
