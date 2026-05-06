
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Menu } from './features/menu/menu'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, Menu],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'] 
})
export class AppComponent {
  menuUsuarioAbierto = false;
  tituloPagina = 'Home';
  esLogin = false; // <--- Nueva variable

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const ruta = event.url;
        
        // Si la ruta incluye 'login', ocultamos el diseño principal
        this.esLogin = ruta.includes('login') || ruta === '/';

        if (ruta.includes('home')) this.tituloPagina = 'Home';
        else if (ruta.includes('products')) this.tituloPagina = 'Products';
        else if (ruta.includes('usuarios')) this.tituloPagina = 'Users';
      }
    });
  }

  cerrarSesion() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']); 
  }

  toggleUserMenu() {
    this.menuUsuarioAbierto = !this.menuUsuarioAbierto;
  }
}