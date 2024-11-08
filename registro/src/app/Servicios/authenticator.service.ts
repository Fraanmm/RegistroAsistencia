import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { APIControllerService } from './apicontroller.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {

  connnectionStatus: boolean = false;

  constructor(private storage: StorageService, private api: APIControllerService, private router: Router) { }

  loginBDD(user: string, pass: string): Promise<boolean> {
    return this.storage
      .get(user)
      .then((res) => {
        if (res.password === pass) {
          this.connnectionStatus = true;
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log('Error en el sistema: ' + error);
        return false;
      });
  }

  login(user: string, pass: string): boolean {
    if (user === 'Francisca' && pass === 'pass1234') {
      this.connnectionStatus = true;
      return true;
    }
    this.connnectionStatus = false;
    return false;
  }

  logout() {
    this.connnectionStatus = false;
  }

  isConected() {
    return this.connnectionStatus;
  }

  async registrar(user: any): Promise<boolean> {
    return this.storage.set(user.username, user).then((res) => {
      if (res != null) {
        return true;
      } else {
        return false;
      }
    }).catch((error) => {
      return false;
    });
  }

  
  registroAPI(user: any): Promise<boolean> {
    return new Promise((respuesta) => {
      this.api.postUser(user).subscribe(
        () => respuesta(true),
        () => respuesta(false)
      );
    });
  }

  
  async loginAPI(user: any): Promise<boolean> {
    return new Promise((resolve) => {
      this.api.getUsers().subscribe(
        (users: any[]) => {
          const foundUser = users.find(
            (u) => u.username === user.username && u.password === user.password
          );
          if (foundUser) {
            this.storage.set('userToken', 'fake-token');  // Guardar un token simulado
            this.connnectionStatus = true;
            resolve(true);

            
            this.router.navigate(['/principal']);
          } else {
            console.log("Contraseña o usuario incorrectos");
            resolve(false);
          }
        },
        (error) => {
          console.error('Error al intentar iniciar sesión:', error);
          resolve(false);
        }
      );
    });
  }
}  