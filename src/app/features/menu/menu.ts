import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {

  menuAbierto = signal(false);

  private router = inject(Router); // 👈 AQUÍ

  toggleMenu() {
    this.menuAbierto.set(!this.menuAbierto());
  }

  irA(ruta: string) {              // 👈 Y AQUÍ
    this.router.navigate([ruta]);
    this.menuAbierto.set(false);
  }

}