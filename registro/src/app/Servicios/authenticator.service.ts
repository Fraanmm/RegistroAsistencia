import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {

  connnectionStatus: boolean = false;

  constructor(
    private storage: StorageService,
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
        this.router.navigate(['/principal']);  // Redirige al principal si es exitoso
        return true;
      } else {
        return false;  // Si las credenciales no coinciden
      }
    } catch (error) {
      console.error('Error en el sistema:', error);
      return false;
    }
  }

  login(user: string, pass: string): boolean {
    if (user === 'Francisca' && pass === 'pass1234') {
      this.saveConnectionStatus(true);
      this.router.navigate(['/principal']);  // Redirige al principal si es exitoso
      return true;
    }
    this.saveConnectionStatus(false);
    return false;  // Si las credenciales no coinciden
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
    // Implementación para registro en la API si es necesario
    return new Promise((resolve) => {
      // Lógica para registrar en la API
      resolve(true);
    });
  }
}
