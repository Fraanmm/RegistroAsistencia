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

  registroAPI(){
    this.auth.registroAPI(this.user).then((data) => {
      console.log('Salio bien');
    })
    .catch((error) => {
      console.log('Salio Mal!');
    });
  }
}
