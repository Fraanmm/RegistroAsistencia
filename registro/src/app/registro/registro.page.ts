import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../services/authenticator.service';

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

  constructor(private router: Router, private authService: AuthenticatorService) {}

  ngOnInit() {}

  registrarUsuario() {
    if (this.nombreUsuario && this.correo && this.contrasena && this.fechaNacimiento && this.nivelEducacional) {
      const user = {
        nombre: this.nombreUsuario,
        correo: this.correo,
        password: this.contrasena,
        fechaNacimiento: this.fechaNacimiento,
        nivelEducacional: this.nivelEducacional,
      };

      this.authService.registrar(user).then((res: boolean) => {
        if (res) {
          console.log('Usuario registrado:', user);
          this.router.navigate(['/login']);
        } else {
          alert('Error al registrar usuario. Intente nuevamente.');
        }
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}

