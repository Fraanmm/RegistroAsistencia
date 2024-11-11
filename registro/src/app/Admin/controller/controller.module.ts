import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControllerPageRoutingModule } from './controller-routing.module';
import { ControllerPage } from './controller.page';

@NgModule({
  imports: [
    CommonModule,
    ControllerPageRoutingModule
  ],
  declarations: [ControllerPage]
})
export class ControllerPageModule {}

