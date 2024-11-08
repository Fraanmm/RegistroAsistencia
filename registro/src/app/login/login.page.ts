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

  constructor(private router: Router, private auth: AuthenticatorService) { }

  ngOnInit() {}

  iniciarSesion() {
    if (this.nombreUsuario && this.contrasena) {
      // Llamamos al servicio de login para verificar las credenciales
      this.auth.loginAPI({ username: this.nombreUsuario, password: this.contrasena })
        .then((result) => {
          if (result) {
            // Si el login fue exitoso, redirigimos al usuario a la página principal
            this.router.navigate(['/home']);
          } else {
            alert('Credenciales incorrectas. Intenta nuevamente.');
          }
        })
        .catch((error) => {
          console.error('Error al iniciar sesión', error);
        });
    } else {
      alert('Por favor, complete ambos campos.');
    }
  }
}
