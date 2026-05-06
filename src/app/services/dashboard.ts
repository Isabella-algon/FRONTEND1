import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.apiBaseUrl}/dashboard`;
  private http = inject(HttpClient);

  // Datos mock por defecto
  private mockData = {
    totalUsers: 200,
    totalProducts: 60,
    totalSales: 250,
    activeUsersPercent: 90,
  };

  getSummary() {
    return this.http.get(`${this.apiUrl}/summary`).pipe(
      catchError((error) => {
        // Si el API falla, devuelve datos mock
        console.log('API no disponible, usando datos mock:', error);
        return of({
          data: this.mockData,
          message: 'Datos mock'
        });
      })
    );
  }

  getSalesByMonth() {
    return this.http.get(`${this.apiUrl}/sales-by-month`).pipe(
      catchError((error) => {
        console.log('Error al obtener ventas por mes:', error);
        return of({
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            data: [12, 19, 30, 25, 20, 28]
          }
        });
      })
    );
  }

  getProductsByCategory() {
    return this.http.get(`${this.apiUrl}/products-by-category`).pipe(
      catchError((error) => {
        console.log('Error al obtener productos por categoría:', error);
        return of({
          data: {
            labels: ['Antibióticos', 'Analgésicos', 'Vitaminas', 'Antiinflamatorios'],
            data: [40, 28, 35, 22]
          }
        });
      })
    );
  }

  getSupplierDistribution() {
    return this.http.get(`${this.apiUrl}/supplier-distribution`).pipe(
      catchError((error) => {
        console.log('Error al obtener distribución de proveedores:', error);
        return of({
          data: {
            labels: ['Tecnoquímicas', 'Sophia', 'Alcon'],
            data: [65, 20, 15]
          }
        });
      })
    );
  }

}