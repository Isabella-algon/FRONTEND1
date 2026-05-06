import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // <-- Cambiado: antes decía App

// Aquí le decimos a la aplicación que arranque usando 'AppComponent'
bootstrapApplication(AppComponent, appConfig) 
  .catch((err) => console.error(err));