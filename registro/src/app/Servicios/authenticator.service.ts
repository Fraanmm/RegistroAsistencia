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
        this.router.navigate(['/principal']);
        return true;
      } else {
        // Si no está en almacenamiento local, prueba con la API
        return this.loginAPI({ username: user, password: pass });
      }
    } catch (error) {
      console.error('Error en el sistema:', error);
      return false;
    }
  }

  async loginAPI(credentials: { username: string; password: string }): Promise<boolean> {
    try {
      const response = await this.api.loginUser(credentials).toPromise();
      if (response) {
        this.saveConnectionStatus(true);
        this.router.navigate(['/principal']);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      return false;
    }
  }

  logout() {
    this.saveConnectionStatus(false);
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
}

