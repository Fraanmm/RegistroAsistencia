import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: string = '';

  constructor(private router: Router, private auth: AuthenticatorService) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as { usuario: string };
      this.usuario = state.usuario || '';  
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
}
