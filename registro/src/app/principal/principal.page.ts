import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  username: string = '';
  asignaturas: any[] = [];
  scannedCode: string | null = null;
  modalVisible: boolean = false;

  constructor(private router: Router, private auth: AuthenticatorService) {}

  ngOnInit() {
    this.solicitarPermisosCamara();

    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;

    if (state && state['usuario']) {
      this.username = state['usuario'];
      this.cargarAsignaturas(this.username);
    } else {
      console.error('Usuario no encontrado en la navegación.');
      this.router.navigate(['/login']); // Redirige al login si no hay usuario
    }
  }

  async solicitarPermisosCamara() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Detiene el acceso después de verificar
    } catch (error) {
      console.error('Permiso para acceder a la cámara denegado o no disponible:', error);
      alert('Por favor, habilita el permiso para acceder a la cámara.');
    }
  }

  async cargarAsignaturas(username: string) {
    try {
      const usuario = await this.auth.obtenerUsuario(username);
      if (usuario && usuario.asignaturas && usuario.asignaturas.length > 0) {
        this.asignaturas = usuario.asignaturas;
      } else {
        console.warn('Usuario no encontrado o sin asignaturas.');
        alert('No se encontraron asignaturas para este usuario.');
      }
    } catch (error) {
      console.error('Error al cargar asignaturas:', error);
      alert('Hubo un problema al cargar las asignaturas.');
    }
  }

  abrirEscanerQR() {
    this.modalVisible = true; // Abre el modal del escáner
  }

  cerrarEscanerQR() {
    this.modalVisible = false; // Cierra el modal del escáner
  }

  onCodeScanned(result: string) {
    this.scannedCode = result; // Almacena el resultado del código QR
    console.log('Código QR escaneado:', result);
    this.cerrarEscanerQR(); // Cierra el escáner después del escaneo
  }
}

