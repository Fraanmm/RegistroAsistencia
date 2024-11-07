import { Component } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage {
  
  users = [
    { id: 1, username: 'Francisca', email: 'fr.ortegau@duocuc.cl', password: 'pass1234' },
    { id: 2, username: 'Nicolas', email: 'ni.garridol@duocuc.cl', password: 'password1234' },
    { id: 3, username: 'Admin', email: 'admin@gmail.', password: 'admin1234' }
  ];

  
  modificarUsuario(id: number) {
    console.log(`Modificar usuario con ID: ${id}`);
    
  }

  
  eliminarUsuario(id: number) {
    console.log(`Eliminar usuario con ID: ${id}`);
    
  }
}
