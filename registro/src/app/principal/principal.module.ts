import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';
import { PrincipalPage } from './principal.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importa el módulo ZXingScannerModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule,
    ZXingScannerModule // Incluye ZXingScannerModule
  ],
  declarations: [PrincipalPage]
})
export class PrincipalPageModule {}
