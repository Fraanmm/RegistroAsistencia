import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as { usuario: string };
      this.usuario = state.usuario || '';  
    }
  }
}
