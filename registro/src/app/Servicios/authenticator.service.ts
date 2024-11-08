import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { APIControllerService } from './apicontroller.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  
  connnectionStatus: boolean = false;
  constructor(private storage: StorageService, private api:APIControllerService) {}

  loginBDD(user: string, pass: String): Promise<boolean> {
    
    return this.storage
      .get(user)
      .then((res) => {
        
        if (res.password == pass) {
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
  
  login(user: String, pass: String): boolean {
    if (user == 'Francisca' && pass == 'pass1234') {
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
  async registrar(user: any):Promise<boolean> {
    
    return this.storage.set(user.username, user).then((res) => {
        if (res != null) {
          return true;
        }else{
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  }

  registroAPI(user: any): Promise<boolean>{
    return new Promise((respuesta)=> {
      this.api.postUser(user).subscribe(
        () => respuesta(true),
        () => respuesta(false)
      );
    });
  }

  loginAPI(user: any): Promise<boolean> {
    return new Promise((respuesta) => {
      this.api.loginUser(user).subscribe(
        () => respuesta(true),  
        () => respuesta(false)  
      );
    });
  }
}