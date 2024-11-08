import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { APIControllerService } from './apicontroller.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {

  connnectionStatus: boolean = false;

  constructor(
    private storage: StorageService,
    private api: APIControllerService,
    private router: Router
  ) {
    // Cargar estado de conexión desde almacenamiento al iniciar
    this.loadConnectionStatus();
  }

  private async loadConnectionStatus() {
    const status = await this.storage.get('connectionStatus');
    this.connnectionStatus = status === true;
  }

  private saveConnectionStatus(status: boolean) {
    this.connnectionStatus = status;
    this.storage.set('connectionStatus', status);
  }

  async loginBDD(user: string, pass: string): Promise<boolean> {
    try {
      const res = await this.storage.get(user);
      if (res && res.password === pass) {
        this.saveConnectionStatus(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error en el sistema:', error);
      return false;
    }
  }

  login(user: string, pass: string): boolean {
    if (user === 'Francisca' && pass === 'pass1234') {
      this.saveConnectionStatus(true);
      return true;
    }
    this.saveConnectionStatus(false);
    return false;
  }

  logout() {
    this.saveConnectionStatus(false);
    this.storage.remove('userToken'); // Borra el token de usuario en el almacenamiento
    this.router.navigate(['/login']);
  }

  isConected(): boolean {
    return this.connnectionStatus;
  }

  async registrar(user: any): Promise<boolean> {
    try {
      const res = await this.storage.set(user.username, user);
      return res != null;
    } catch (error) {
      console.error('Error en el registro:', error);
      return false;
    }
  }

  registroAPI(user: any): Promise<boolean> {
    return new Promise((resolve) => {
      this.api.postUser(user).subscribe(
        () => resolve(true),
        (error) => {
          console.error('Error en el registro de API:', error);
          resolve(false);
        }
      );
    });
  }

  async loginAPI(user: any): Promise<boolean> {
    return new Promise((resolve) => {
      this.api.loginUser(user).subscribe(
        async (response: any) => {
          if (response && response.token) {
            await this.storage.set('userToken', response.token);
            await this.storage.set('username', user.username); // Guarda el nombre de usuario
            this.saveConnectionStatus(true);
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
