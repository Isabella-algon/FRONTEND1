import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
 
  // ============================================================
  // KPIs — datos exactos de la base de datos
  // ============================================================
 
  readonly totalProductos    = 150;
  readonly topCategoria      = 'Antibióticos';
  readonly topForma          = 'Solución oftálmica';
  readonly totalLaboratorios = 29;
 
  // ============================================================
  // GRÁFICO DE BARRAS — Productos por categoría
  //
  // Conteo exacto de la BD:
  //   Antibióticos       → 64 productos
  //   Anti-inflamatorios → 40 productos
  //   Lubricantes        → 12 productos
  //   Antiglaucomatosos  → 12 productos
  //   Antialérgicos      → 11 productos
  //   Autonómicos        →  8 productos
  //   Anestésicos        →  3 productos
  // ============================================================
 
  readonly barChartType = 'bar' as const;
 
  barChartData: ChartData<'bar'> = {
    labels: [
      'Antibióticos',
      'Anti-inflamatorios',
      'Lubricantes',
      'Antiglaucomatosos',
      'Antialérgicos',
      'Autonómicos',
      'Anestésicos',
    ],
    datasets: [
      {
        data: [64, 40, 12, 12, 11, 8, 3],
        label: 'Productos por categoría',
        backgroundColor: [
          'rgba(74,  222, 128, 0.75)',
          'rgba(248, 113, 113, 0.75)',
          'rgba(45,  212, 191, 0.75)',
          'rgba(96,  165, 250, 0.75)',
          'rgba(192, 132, 252, 0.75)',
          'rgba(251, 191,  36, 0.75)',
          'rgba(148, 163, 184, 0.75)',
        ],
        borderColor: [
          '#4ade80', '#f87171', '#2dd4bf',
          '#60a5fa', '#c084fc', '#fbbf24', '#94a3b8',
        ],
        borderWidth: 1,
        borderRadius: 6,
      }
    ]
  };
 
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 0,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.parsed.y} productos`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.04)' }
      },
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.07)' },
        beginAtZero: true
      }
    }
  };
 
  // ============================================================
  // GRÁFICO DOUGHNUT — Top laboratorios
  //
  // 29 laboratorios de la BD. Los de menor presencia
  // se agrupan en "Otros (16 labs)" para legibilidad.
  // ============================================================
 
  readonly doughnutChartType = 'doughnut' as const;
 
  doughnutChartData: ChartData<'doughnut'> = {
    labels: [
      'Alcon',
      'Poen',
      'Tecnoquímicas S.A',
      'Allergan',
      'SAVAL S.A',
      'Sophia',
      'OPHTHA',
      'Esp. Oftalmológicas S.A.',
      'Axon Pharma SAS',
      'AbbVie',
      'Abbott',
      'Pfizer',
      'Megalabs',
      'Otros (16 labs)',
    ],
    datasets: [
      {
        data: [14, 11, 9, 8, 7, 6, 5, 4, 3, 3, 3, 2, 2, 13],
        backgroundColor: [
          '#2dd4bf', '#60a5fa', '#4ade80', '#c084fc',
          '#f87171', '#fbbf24', '#fb923c', '#a78bfa',
          '#38bdf8', '#e879f9', '#86efac', '#fde68a',
          '#f9a8d4', '#475569',
        ],
        borderColor: '#0f172a',
        borderWidth: 2,
        hoverOffset: 8,
      }
    ]
  };
 
  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 0,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#94a3b8',
          font: { size: 11 },
          padding: 10,
          boxWidth: 12,
        }
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed} productos`
        }
      }
    },
  };
 
  // ============================================================
  // GRÁFICO HORIZONTAL — Formas farmacéuticas
  // FIX: renombrado de formaChart → lineChart para coincidir
  // con los nombres que usa el HTML ([data]="lineChartData", etc.)
  //
  // Las 8 formas exactas de la BD con conteo real del vademécum.
  // Se usa indexAxis: 'y' para barra horizontal.
  // ============================================================
 
  readonly lineChartType = 'bar' as const;
 
  lineChartData: ChartData<'bar'> = {
    labels: [
      'Solución oftálmica',
      'Suspensión',
      'Ungüento oftálmico',
      'Gotas oftálmicas',
      'Emulsión oftálmica',
      'Gel oftálmico',
      'Emulsión (30 viales)',
      'Gotas sin conservantes',
    ],
    datasets: [
      {
        data: [72, 32, 16, 14, 6, 4, 4, 2],
        label: 'Productos',
        backgroundColor: 'rgba(96, 165, 250, 0.7)',
        borderColor: '#60a5fa',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };
 
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 0,
    indexAxis: 'y' as const,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.parsed.x} productos`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.06)' },
        beginAtZero: true
      },
      y: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.03)' }
      }
    }
  };
 
  ngOnInit(): void {}
}