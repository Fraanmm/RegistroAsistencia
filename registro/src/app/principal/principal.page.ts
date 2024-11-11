import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  username: string = '';
  asignaturas: { nombre: string, imagen: string }[] = [
    { nombre: 'Programación AP', imagen: 'assets/img/pam.jpg' },
    { nombre: 'Ética', imagen: 'assets/img/etica.jpg' },
    { nombre: 'Programación BD', imagen: 'assets/img/pbd.jpg' },
    { nombre: 'Arquitectura', imagen: 'assets/img/arqui.jpg' }
  ]; 
  qrData: string | null = null; 

  constructor(private router: Router, private auth: AuthenticatorService) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as { username: string };
      this.username = state.username || '';
    }
  }

  @HostListener('window:popstate', ['$event'])
  async onBackNavigation(event: Event) {
    event.preventDefault();
    const confirmLogout = confirm('¿Estás seguro de que quieres cerrar sesión?');
    if (confirmLogout) {
      this.auth.logout();
      this.router.navigate(['/login']);
    }
  }

  generarQR() {
   
    this.qrData = 'assets/img/qr.png'; 
  }
}

