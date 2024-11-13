import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private auth: AuthenticatorService) {}

  iniciarSesion() {
    this.auth
      .loginBDD(this.username, this.password)
      .then((loggedIn) => {
        if (loggedIn) {
          let navExtras: NavigationExtras = {
            state: { usuario: this.username },
          };
          this.router.navigate(['/principal'],navExtras);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
      .catch((error) => {
        console.error('Error al intentar iniciar sesión:', error);
        alert('Hubo un problema con el inicio de sesión');
      });
  }
}
