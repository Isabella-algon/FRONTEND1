import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // 🧑 USUARIOS
  private users = new BehaviorSubject<any[]>([]);
  users$ = this.users.asObservable();

  // 💊 PRODUCTOS
  private products = new BehaviorSubject<any[]>([]);
  products$ = this.products.asObservable();

  // 🔹 SETEAR DATOS
  setUsers(data: any[]) {
    this.users.next(data);
  }

  setProducts(data: any[]) {
    this.products.next(data);
  }

  // 🔹 AGREGAR
  addUser(user: any) {
    const current = this.users.value;
    this.users.next([...current, user]);
  }

  addProduct(product: any) {
    const current = this.products.value;
    this.products.next([...current, product]);
  }
}