import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../service/userService/userService';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Users {

  private userService = inject(UserService);

  usuarios = signal<User[]>([]);

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log('Usuarios cargados:', users);
        this.usuarios.set(users);
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
      }
    });
  }
}