import { Component } from '@angular/core';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Menu], // 👈 IMPORTANTE
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {}


