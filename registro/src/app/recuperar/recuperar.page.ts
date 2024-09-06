import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  usuario = ''; 

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {}

  async recuperarContra() {
    if (this.usuario) {
      
      const alert = await this.alertController.create({
        header: '¡Recuperación de contraseña!',
        message: 'La contraseña ha sido enviada a su correo y reestablecida.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              
              let navigationExtras: NavigationExtras = {
                state: {
                  usuario: this.usuario
                }
              };

              
              this.router.navigate(['/principal'], navigationExtras);
            }
          }
        ]
      });

     
      await alert.present();
    } else {
      
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese su nombre de usuario.',
        buttons: ['OK']
      });

    
      await alert.present();
    }
  }
}
