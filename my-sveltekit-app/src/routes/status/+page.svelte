<script>
  import { MoreVertical, Filter, RefreshCw, Clock, Activity, Truck, Info, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  // Data states
  let vehicleStatusData = [];
  let statusData = {
    running: 0,
    assetOff: 0,
    noData: 0,
    idling: 0,
    offline: 0,
    immobilized: 0
  };

  // Fetch and process data
  onMount(async () => {
    try {
      const response = await fetch('/vehicle_status_widget_json.json');
      if (!response.ok) throw new Error('Failed to fetch data');
      
      vehicleStatusData = await response.json();
      
      // Process vehicle status
      vehicleStatusData.forEach(vehicle => {
        switch(vehicle.state) {
          case 'R': // Running
            statusData.running++;
            break;
          case 'S': // Stopped/Asset Off
            statusData.assetOff++;
            break;
          case 'N': // No Data
            statusData.noData++;
            break;
          case 'I': // Idling
            statusData.idling++;
            break;
          case 'O': // Offline
            statusData.offline++;
            break;
          case 'M': // Immobilized
            statusData.immobilized++;
            break;
          default:
            statusData.noData++;
        }
      });

      // Force reactivity
      statusData = { ...statusData };
    } catch (error) {
      console.error('Error loading vehicle status data:', error);
    }
  });

  // Computed values
  $: totalAssets = vehicleStatusData.length;
  $: total = Object.values(statusData).reduce((a, b) => a + b, 0);
  $: segments = Object.entries(statusData).map(([key, value]) => ({
    percent: (value / total) * 100 || 0,
    color: getColor(key)
  }));

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

  // Get current date in required format
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');
</script>

<div class="p-6 bg-gray-50 min-h-screen">
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
      <!-- Donut Chart -->
      <div class="relative aspect-square max-w-[400px]">
        <svg viewBox="0 0 100 100" class="transform -rotate-90">
          {#each segments as segment, i}
            {@const offset = segments
              .slice(0, i)
              .reduce((acc, curr) => acc + curr.percent, 0)}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={segment.color}
              stroke-width="20"
              stroke-dasharray={`${segment.percent} ${100 - segment.percent}`}
              stroke-dashoffset={-offset}
            />
          {/each}
        </svg>
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
</div>

<style>
  /* Add any component-specific styles here */
  :global(.status-card) {
    transition: transform 0.2s ease;
  }
  :global(.status-card:hover) {
    transform: translateY(-2px);
  }
</style>


