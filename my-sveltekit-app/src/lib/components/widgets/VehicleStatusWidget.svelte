<script>
  import { fade } from 'svelte/transition';
  import { Truck, MoreVertical } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js/auto';
  
  export let vehicleStatusData = [];
  export let statusData = {};
  export let totalAssets = 0;

  let chartCanvas;
  let chart;

  // Color mapping function
  function getColor(status) {
    const colors = {
      running: '#22c55e',
      assetOff: '#0ea5e9',
      noData: '#94a3b8',
      idling: '#f87171',
      offline: '#fbbf24',
      immobilized: '#1e293b'
    };
    return colors[status];
  }

  // Create pie chart
  const createChart = () => {
    const ctx = chartCanvas.getContext('2d');
    
    if (chart) chart.destroy();
    
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(statusData).map(key => key.replace(/([A-Z])/g, ' $1').trim()),
        datasets: [{
          data: Object.values(statusData),
          backgroundColor: Object.keys(statusData).map(getColor),
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            padding: 12,
            titleFont: { size: 14 },
            bodyFont: { size: 13 },
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.formattedValue;
                const percentage = ((context.raw / totalAssets) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });
  };

  $: if (chartCanvas && Object.keys(statusData).length > 0) {
    createChart();
  }

  onMount(() => {
    if (Object.keys(statusData).length > 0) {
      createChart();
    }
    return () => {
      if (chart) chart.destroy();
    };
  });

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');
</script>

<div class="bg-white rounded-lg shadow-sm p-6" in:fade={{ duration: 300 }}>
  <!-- Header -->
  <div class="flex justify-between items-center mb-8 border-b pb-4">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-blue-50 rounded-lg">
        <Truck class="text-blue-800" size={24} />
      </div>
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Vehicle Status</h1>
        <p class="text-sm text-gray-500">Report Date: {currentDate}</p>
      </div>
    </div>
    <button class="p-2 hover:bg-gray-100 rounded-full">
      <MoreVertical size={20} />
    </button>
  </div>

  <!-- Main Content -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Pie Chart -->
    <div class="relative aspect-square max-w-[400px]">
      <canvas bind:this={chartCanvas}></canvas>
    </div>

    <!-- Status Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Total Assets -->
      <div class="col-span-2 md:col-span-3 bg-blue-900 text-white p-4 rounded-lg">
        <h3 class="text-sm font-medium mb-2">Total Assets</h3>
        <p class="text-3xl font-bold">{totalAssets}</p>
        <a href="#" class="text-xs text-blue-200 hover:underline float-right">List</a>
      </div>

      {#each Object.entries(statusData) as [status, count]}
        <div class="bg-white p-4 rounded-lg shadow-sm border" style="border-left-color: {getColor(status)}; border-left-width: 4px;">
          <h3 class="text-sm font-medium capitalize mb-2">{status.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <p class="text-2xl font-bold">{count}</p>
          <a href="#" class="text-xs text-blue-600 hover:underline float-right">List</a>
        </div>
      {/each}
    </div>
  </div>

  <!-- Bottom Info -->
  <div class="mt-8 flex justify-between items-center text-gray-600">
    <p>Asset offline greater than 2 days</p>
    <span class="text-2xl text-pink-500">{statusData.offline}</span>
  </div>
</div>