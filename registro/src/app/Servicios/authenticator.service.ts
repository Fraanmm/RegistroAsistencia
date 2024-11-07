import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  connnectionStatus: boolean = false;

  constructor(private storage: StorageService) {}

  loginBDD(user: string, pass: string): Promise<boolean> {
    return this.storage
      .get(user)
      .then((res) => {
        if (res?.password === pass) {
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
    if (!user.nombre || !user.password || !user.email) {
      console.log('Error: Datos incompletos.');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|gmail\.com)$/;
    if (!emailRegex.test(user.email)) {
      console.log('Error: Correo no válido.');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(user.password)) {
      console.log('Error: Contraseña inválida.');
      return false;
    }

    return this.storage.set(user.nombre, user).then((res) => {
      if (res != null) {
        console.log('Usuario registrado correctamente.');
        return true;
      } else {
        console.log('Error al registrar el usuario.');
        return false;
      }
    }).catch((error) => {
      console.log('Error al registrar el usuario: ' + error);
      return false;
    });
  }
}
