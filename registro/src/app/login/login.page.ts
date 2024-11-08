import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    const usuario = {
      username: this.username,
      password: this.password,
    };
  
    this.auth.loginAPI(usuario).then((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['/principal'], { state: { usuario: this.username } });
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }).catch((error) => {
      console.error('Error al intentar iniciar sesión:', error);
      alert('Hubo un problema con el inicio de sesión');
    });
  }
  
}
