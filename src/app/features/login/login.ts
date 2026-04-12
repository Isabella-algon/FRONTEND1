import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ReactiveFormsModule es clave para lo avanzado
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router); // 👈 AQUÍ VA
  // Usamos SIGNAL para el interruptor (Nivel Avanzado)
  esRegistro = signal<boolean>(false);

  // Creamos el formulario reactivo con todos tus campos de Optometría
  form = this.fb.group({
    full_name: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: [''],
    telephone: [''],
    identification: ['']
  });

  // Función para cambiar de modo usando .set() de los Signals
  toggleModo() {
    this.esRegistro.set(!this.esRegistro());
    this.form.reset(); // Limpia los campos al cambiar
  }

  // Función de ingreso
  login() {
  if (this.form.valid) {
    const datos = this.form.value;

    alert(`Iniciando sesión como: ${datos.full_name}`);

    // 🔥 REDIRECCIÓN
    this.router.navigate(['/homeworks']);

  } else {
    alert('Por favor, llena los campos obligatorios.');
  }
}

  // Función de registro
  registrar() {
    const datos = this.form.value;
    alert(`Registro de Optometría Exitoso:\nUsuario: ${datos.full_name}\nDocumento: ${datos.identification}`);
    this.esRegistro.set(false); // Vuelve al login
  }
}

