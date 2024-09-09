import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderPanelComponent } from './header-panel/header-panel.component';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterPanelComponent } from './footer-panel/footer-panel.component';
import { SharedModule } from '../shared/shared.module';
 
 

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderPanelComponent,
    DrawerComponent,
    FooterPanelComponent 
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
