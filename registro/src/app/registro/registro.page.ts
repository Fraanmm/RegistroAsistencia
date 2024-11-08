import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombreUsuario: string = '';
  correo: string = '';
  contrasena: string = '';

  constructor(private router: Router, private auth: AuthenticatorService) { }

  ngOnInit() {}

  registrarUsuario() {
    // Validar que los campos esenciales estén completos
    if (this.nombreUsuario && this.correo && this.contrasena) {
      // Llamar al registro a través de la API
      this.registroAPI();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  registroAPI() {
    // Crear un objeto `user` con los campos necesarios
    const user = {
      username: this.nombreUsuario,
      email: this.correo,
      password: this.contrasena,
    };

    // Llamar al servicio de autenticación para registrar al usuario
    this.auth.registroAPI(user)
      .then((data: boolean) => {
        if (data) {
          console.log('Registro exitoso');
          // Redirigir al usuario al login
          this.router.navigate(['/login']);
        } else {
          console.log('Hubo un problema con el registro');
        }
      })
      .catch((error: any) => {
        console.error('Error durante el registro:', error);
      });
  }
}

