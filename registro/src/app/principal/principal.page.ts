import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: string = '';

  constructor(private router: Router) {
  
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { usuario: string };
    if (state) {
      this.usuario = state.usuario; 
    }
  }

  ngOnInit() {}
}
