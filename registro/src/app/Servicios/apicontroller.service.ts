import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIControllerService {

  apiURL = "http://localhost:3000"; // URL de tu servidor json-server

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios (no recomendado para producción)
  getUsers(): Observable<any> {
    return this.http.get(this.apiURL + "/users");
  }

  // Crear un nuevo usuario
  postUser(data: any): Observable<any> {
    return this.http.post(this.apiURL + "/users", data);
  }

  // Actualizar un usuario
  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(this.apiURL + "/users/" + id, data);
  }

  // Eliminar un usuario
  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.apiURL + "/users/" + id);
  }

  // Iniciar sesión con usuario y contraseña
  loginUser(credentials: any): Observable<any> {
    return this.http.get<any[]>(this.apiURL + "/users").pipe(
      map(users => {
        const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
        if (user) {
          return { message: 'Login exitoso', user };  
        } else {
          throw new Error('Usuario o contraseña incorrectos'); 
        }
      }),
      catchError(error => {
        throw new Error(error.message || 'Error en la autenticación');
      })
    );
  }
}

