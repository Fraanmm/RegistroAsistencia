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
  fechaNacimiento: string = '';
  nivelEducacional: string = '';

  constructor(private router: Router, private auth: AuthenticatorService) { }

  ngOnInit() {}

  registrarUsuario() {
    if (this.nombreUsuario && this.correo && this.contrasena && this.fechaNacimiento && this.nivelEducacional) {
      
      console.log('Usuario registrado:', {
        nombreUsuario: this.nombreUsuario,
        correo: this.correo,
        contrasena: this.contrasena,
        fechaNacimiento: this.fechaNacimiento,
        nivelEducacional: this.nivelEducacional,
      });

      this.router.navigate(['/login']);
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  registroAPI() {
    // Crear un objeto `user` a partir de las propiedades existentes
    const user = {
      username: this.nombreUsuario,
      email: this.correo,
      password: this.contrasena,
      birthDate: this.fechaNacimiento,
      educationLevel: this.nivelEducacional,
    };

    this.auth.registroAPI(user)
      .then((data: boolean) => {  // Especificado tipo `boolean` para `data`
        if (data) {
          console.log('Salió bien');
        } else {
          console.log('Hubo un problema con el registro');
        }
      })
      .catch((error: any) => {  // Especificado tipo `any` para `error`
        console.error('Error durante el registro:', error);
      });
  }
}
