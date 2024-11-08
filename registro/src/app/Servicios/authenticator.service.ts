import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { APIControllerService } from './apicontroller.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {

  connnectionStatus: boolean = false;

  constructor(private storage: StorageService, private api: APIControllerService) { }

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

  // Registrar un usuario en la API
  registroAPI(user: any): Promise<boolean> {
    return new Promise((respuesta) => {
      this.api.postUser(user).subscribe(
        () => respuesta(true),
        () => respuesta(false)
      );
    });
  }

  // Método para realizar login a través de la API
  loginAPI(user: any): Promise<boolean> {
    return new Promise((resolve) => {
      this.api.loginUser(user).subscribe(
        (response: any) => {
          if (response.token) {
            // Si la respuesta incluye un token, guarda el token en el almacenamiento
            this.storage.set('userToken', response.token);
            resolve(true);
          } else {
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
