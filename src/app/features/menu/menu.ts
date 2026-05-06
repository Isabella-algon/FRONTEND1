import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/loginService/loginService'; //  IMPORTAMOS el servicio de login
import { CommonModule } from '@angular/common'; // 👈 NECESARIO para usar *ngIf

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  imports: [CommonModule]
})
export class Menu {

  menuAbierto = signal(false); //  controla si el menú está abierto o cerrado

  private router = inject(Router); //  para navegar entre páginas
  private loginService = inject(LoginService); //  obtenemos info del usuario logueado

  // 👇 obtenemos el rol del usuario (1 = admin, 2 = usuario normal)
  role = this.loginService.getUser()?.role_id;


  toggleMenu() {
    this.menuAbierto.set(!this.menuAbierto()); // abre/cierra el menú
  }

  irA(ruta: string) {
    this.router.navigate([ruta]); //  navega a la ruta (home, products, users)
    this.menuAbierto.set(false);  //  cierra el menú después de hacer click
  }

}