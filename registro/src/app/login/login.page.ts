import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = '';  
  password = ''; 

  constructor(private router: Router, private auth: AuthenticatorService) { }

  ngOnInit() {}

  iniciarSesion() {
    this.auth.loginAPI({ usuario: this.usuario, password: this.password })
      .then((data: boolean) => {  
        if (data) {
          console.log('Inicio de sesión exitoso');
          let navigationExtras: NavigationExtras = {
            state: {
              usuario: this.usuario
            }
          };
          this.router.navigate(['/principal'], navigationExtras);
        } else {
          alert('Hubo un problema con el inicio de sesión.');
        }
      })
      .catch((error: any) => {  
        console.error('Error durante el inicio de sesión:', error);
        alert('Error en el servidor, intenta de nuevo más tarde.');
      });
  }
}
