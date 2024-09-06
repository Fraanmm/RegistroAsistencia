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

  constructor(private router: Router) { }

  ngOnInit() {}

  iniciarSesion() {
    if (this.usuario && this.password) {
      console.log('Inicio de sesión exitoso');

      let navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
  
      this.router.navigate(['/principal'], navigationExtras);
    } else {
      alert('Por favor, ingresa tu usuario y contraseña.');
    }
  }
}
