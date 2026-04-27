import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {

  private dashboardService = inject(DashboardService);

  // 🔹 RESUMEN
  summary = signal({
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    activeUsersPercent: 0,
  });

  // 🔹 TIPOS DE GRÁFICAS
  lineChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  doughnutChartType: ChartType = 'doughnut';

  // 🔹 DATOS INICIALES
  lineChartData = signal<ChartData<'line'>>({
    labels: ['Ene', 'Feb', 'Mar'],
    datasets: [
      {
        data: [12, 19, 30],
        label: 'Ventas',
        tension: 0.3,
        fill: false,
      },
    ],
  });

  barChartData = signal<ChartData<'bar'>>({
    labels: ['Antibióticos', 'Analgésicos', 'Vitaminas', 'Antiinflamatorios'],
    datasets: [
      {
        data: [40, 28, 35, 22],
        label: 'Productos por categoría'
      }
    ]
  });

  doughnutChartData = signal<ChartData<'doughnut'>>({
    labels: ['Tecnoquímicas', 'Sophia', 'Alcon'],
    datasets: [
      {
        data: [65, 20, 15]
      }
    ]
  });

  // 🔹 OPCIONES
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
    this.loadDashboardData();
  }

  // 🔥 CARGAR DATOS
  loadDashboardData() {

    // ✅ SOLO RESUMEN (esto sí debería funcionar)
    this.dashboardService.getSummary().subscribe({
      next: (res: any) => {
        console.log('SUMMARY:', res);
        if (res?.data) {
          this.summary.set(res.data);
        }
      },
      error: (err) => console.error('Error summary:', err)
    });

    // ✅ PRODUCTOS POR CATEGORÍA
    this.dashboardService.getProductsByCategory().subscribe({
      next: (res: any) => {
        if (res?.data) {
          this.barChartData.set({
            labels: res.data.labels,
            datasets: [
              {
                data: res.data.data,
                label: 'Productos por categoría'
              }
            ]
          });
        }
      },
      error: (err) => console.error('Error categorías:', err)
    });

    // ✅ DISTRIBUCIÓN DE PROVEEDORES
    this.dashboardService.getSupplierDistribution().subscribe({
      next: (res: any) => {
        if (res?.data) {
          this.doughnutChartData.set({
            labels: res.data.labels,
            datasets: [
              {
                data: res.data.data
              }
            ]
          });
        }
      },
      error: (err) => console.error('Error proveedores:', err)
    });

    // ✅ VENTAS POR MES
    this.dashboardService.getSalesByMonth().subscribe({
      next: (res: any) => {
        if (res?.data) {
          this.lineChartData.set({
            labels: res.data.labels,
            datasets: [
              {
                data: res.data.data,
                label: 'Ventas',
                tension: 0.3,
                fill: false,
              }
            ]
          });
        }
      },
      error: (err) => console.error('Error ventas:', err)
    });

  }
}