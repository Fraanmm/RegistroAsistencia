import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = '';
  password = '';

  constructor(private router: Router) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      usuario: string;
      password: string;
    };

    if (state) {
      this.usuario = state.usuario;
      this.password = state.password;
    }
  }

  ngOnInit() {}

  iniciarSesion() {
    if (this.usuario && this.password) {

      this.router.navigate(['/principal']);
      
      const extras: NavigationExtras = {
        state: {
          usuario: this.usuario,
        }

      };
      this.router.navigate(['/inicio'], extras); 
    } else {
      
      alert('Por favor, ingresa tu correo y contraseña.');
    }
  }
}
