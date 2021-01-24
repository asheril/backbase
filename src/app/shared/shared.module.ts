import { NgModule } from '@angular/core';
import { WindowViewComponent } from './components/window-view/window-view.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';

@NgModule({
  declarations: [WindowViewComponent, HeaderLogoComponent],
  exports: [WindowViewComponent, HeaderLogoComponent],
})
export class SharedModule {}
