import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticatorService } from 'src/app/Servicios/authenticator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  user = {
    username: '',
    email: '',
    password: '',
  };

  constructor(
    private auth: AuthenticatorService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async registrar() {
    this.auth
      .registroAPI(this.user)
      .then((res: boolean) => {  // Añadí tipo `boolean` a `res`
        if (res) {
          this.router.navigate(['/registro']);
          return this.toastController.create({
            message: 'Registrado con éxito',
            duration: 5000,
            position: 'bottom',
          });
        } else {
          throw new Error('Error al registrar');  // Lanza un error si `res` es `false`
        }
      })
      .then((toast) => toast.present())
      .catch((error: any) => {  // Añadí tipo `any` a `error`
        return this.toastController
          .create({
            message: 'Error al registrar',
            duration: 5000,
            position: 'bottom',
          })
          .then((toast) => toast.present());
      });
  }
}
