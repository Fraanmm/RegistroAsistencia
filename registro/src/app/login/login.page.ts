import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombreUsuario: string = '';
  contrasena: string = '';

  constructor(private router: Router, private auth: AuthenticatorService) {}

  ngOnInit() {}

  async iniciarSesion() {
    if (this.nombreUsuario && this.contrasena) {
      try {
        const result = await this.auth.loginAPI({ username: this.nombreUsuario, password: this.contrasena });
        if (result) {
          this.router.navigate(['/home']);
        } else {
          alert('Credenciales incorrectas. Intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión', error);
      }
    } else {
      alert('Por favor, complete ambos campos.');
    }
  }
}
