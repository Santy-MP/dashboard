import { matriz } from "./Data.js";

let chartRadar, chartPolar, chartSalarios, chartRoles;

export function initCharts(data = matriz) {
  const ctxRadar = document.getElementById("chartRadar")?.getContext("2d");
  const ctxPolar = document.getElementById("chartPolar")?.getContext("2d");
  const ctxSalarios = document.getElementById("chartSalarios")?.getContext("2d");
  const ctxRoles = document.getElementById("chartRoles")?.getContext("2d");

  const total = data.length || 1;

  const avgAge = data.reduce((acc, f) => acc + (f[3] || 0), 0) / total;
  const avgSalary = data.reduce((acc, f) => acc + (f[4] || 0), 0) / total;
  const activePercent = (data.filter(f => f[8] === "Activo").length / total) * 100;

  const activos = data.filter(f => f[8] === "Activo").length;
  const inactivos = data.filter(f => f[8] === "Inactivo").length;

  const topSalarios = [...data].sort((a,b) => b[4] - a[4]).slice(0, 5);
  const labelsSalarios = topSalarios.map(f => f[1]);
  const valoresSalarios = topSalarios.map(f => f[4]);

  const roles = {
    Cliente: data.filter(f => f[9] === "Cliente").length,
    Administrador: data.filter(f => f[9] === "Administrador").length,
    SuperAdmin: data.filter(f => f[9] === "SuperAdmin").length
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } },
      tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.95)', padding: 12, cornerRadius: 8 }
    }
  };

  if (chartRadar) chartRadar.destroy();
  if (chartPolar) chartPolar.destroy();
  if (chartSalarios) chartSalarios.destroy();
  if (chartRoles) chartRoles.destroy();

  if (ctxRadar) {
    chartRadar = new Chart(ctxRadar, {
      type: 'radar',
      data: {
        labels: ['Edad Prom.', 'Salario Prom.', 'Activos %'],
        datasets: [{
          label: 'Métricas Actuales',
          data: [avgAge, avgSalary / 50000, activePercent],
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: '#6366f1',
          pointBackgroundColor: '#6366f1'
        }]
      },
      options: { ...commonOptions, scales: { r: { beginAtZero: true, ticks: { display: false } } } }
    });
  }

  if (ctxPolar) {
    chartPolar = new Chart(ctxPolar, {
      type: 'polarArea',
      data: {
        labels: ['Activos', 'Inactivos'],
        datasets: [{
          data: [activos, inactivos],
          backgroundColor: ['rgba(5, 150, 105, 0.7)', 'rgba(225, 29, 72, 0.7)']
        }]
      },
      options: commonOptions
    });
  }

  if (ctxSalarios) {
    chartSalarios = new Chart(ctxSalarios, {
      type: 'bar',
      data: {
        labels: labelsSalarios,
        datasets: [{
          label: 'Salario ($)',
          data: valoresSalarios,
          backgroundColor: 'rgba(217, 119, 6, 0.7)',
          borderRadius: 8
        }]
      },
      options: {
        ...commonOptions,
        indexAxis: 'y',
        plugins: { ...commonOptions.plugins, legend: { display: false } }
      }
    });
  }

  if (ctxRoles) {
    chartRoles = new Chart(ctxRoles, {
      type: 'doughnut',
      data: {
        labels: Object.keys(roles),
        datasets: [{
          data: Object.values(roles),
          backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899'],
          borderWidth: 0,
          cutout: '70%'
        }]
      },
      options: commonOptions
    });
  }
}
