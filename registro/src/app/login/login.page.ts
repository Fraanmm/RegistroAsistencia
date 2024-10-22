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

  constructor(private router: Router, private auth:AuthenticatorService) { }

  ngOnInit() {}

  iniciarSesion() {
    if (this.auth.login(this.usuario , this.password)) {
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
