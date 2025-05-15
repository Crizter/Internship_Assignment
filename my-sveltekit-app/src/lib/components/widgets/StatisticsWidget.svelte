<script>
  import { fade } from 'svelte/transition';
  import { Activity, MoreVertical } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js/auto';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  
  export let alarmStats;
  export let paginatedStats;

  let chartCanvas;
  let chart;

  // Register the datalabels plugin
  Chart.register(ChartDataLabels);

  // Chart configuration
  const createChart = () => {
    const ctx = chartCanvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (chart) chart.destroy();
    
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: paginatedStats.map(stat => stat.type),
        datasets: [{
          data: paginatedStats.map(stat => stat.count),
          backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500
          borderColor: 'rgba(37, 99, 235, 1)', // blue-600
          borderWidth: 1,
          borderRadius: 4,
          hoverBackgroundColor: 'rgba(96, 165, 250, 0.9)', // blue-400
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 500,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'normal'
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              title: (items) => items[0].label,
              label: (item) => `Count: ${item.raw}`
            }
          },
          // Add this new datalabels plugin configuration
          datalabels: {
            color: '#1e293b',
            anchor: 'end',
            align: 'start',
            offset: -2,
            font: {
              size: 11,
              weight: '500'
            },
            formatter: (value) => value
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(226, 232, 240, 0.5)'
            },
            ticks: {
              font: {
                size: 11
              },
              color: 'rgb(100, 116, 139)'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              },
              color: 'rgb(100, 116, 139)',
              maxRotation: 45,
              minRotation: 45
            }
          }
        }
      }
    });
  };

  // Update chart when data changes
  $: if (chartCanvas && paginatedStats) {
    createChart();
  }

  onMount(() => {
    createChart();
    
    return () => {
      if (chart) chart.destroy();
    };
  });
</script>

<div class="bg-white rounded-lg shadow p-4 widget" in:fade={{ duration: 300, delay: 100 }}>
  <!-- Header section remains the same -->
  <div class="flex justify-between items-start widget-header">
    <div class="flex items-center gap-3">
      <div class="icon-container">
        <Activity class="text-blue-800" size={24} />
      </div>
      <div>
        <h2 class="text-lg font-semibold widget-title">Alarm Statistics</h2>
        <p class="text-sm text-gray-600">Report Date: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
    <button class="p-2 hover:bg-gray-100 rounded-full">
      <MoreVertical size={20} />
    </button>
  </div>

  <!-- Chart container -->
  <div class="h-80 w-full px-4">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
</div>

<style>
  .widget {
    animation: slideIn 0.5s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>