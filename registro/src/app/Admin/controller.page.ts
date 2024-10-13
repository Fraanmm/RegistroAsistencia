import { Component } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage {
  
  users = [
    { id: 1, username: 'fr.ortegau', email: 'correo@correo.cl', password: 'pass1234' },
    { id: 2, username: 'z.test', email: 'email@gmail.com', password: 'password1234' },
    { id: 3, username: 'i.prueba', email: 'prueba@outlook.com', password: 'contraseña' }
  ];

  
  modificarUsuario(id: number) {
    console.log(`Modificar usuario con ID: ${id}`);
    
  }

  
  eliminarUsuario(id: number) {
    console.log(`Eliminar usuario con ID: ${id}`);
    
  }
}
