import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent],
  imports: [SharedModule, RouterModule],
  exports: [SidebarComponent, HeaderComponent],
})
export class UiModule {}
