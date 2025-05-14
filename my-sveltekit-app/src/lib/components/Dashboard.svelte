<script>
  import { fade } from 'svelte/transition';
  import { MoreVertical, Filter, RefreshCw, Clock, Activity, Truck, Info, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import '../styles/dashboard.css';

  // Pagination states
  let alarmPage = 0;
  let statsPage = 0;
  let performancePage = 0;
  const itemsPerPage = 6;

  // Data states
  let alarmData = { alarms: { counts: {}, alarms: [] } };
  let vehicleData = [];
  
  // Fetch data on component mount
  onMount(async () => {
    const [alarmResponse, vehicleResponse] = await Promise.all([
      fetch('/static/alarms_json.json'),
      fetch('/static/vehicle_performance_json.json')
    ]);
    
    alarmData = await alarmResponse.json();
    vehicleData = await vehicleResponse.json();
  });

  // Computed values
  $: totalAlarms = alarmData.alarms.alarms.length
  $: alarmStats = Object.entries(alarmData.alarms.counts).map(([type, count]) => ({
    type: type.replace(';', '').trim(),
    count
  }));
  
  $: paginatedAlarms = alarmData.alarms.alarms
  .slice(alarmPage * itemsPerPage, (alarmPage + 1) * itemsPerPage)
  .map(alarm => ({
    createtime: alarm.createtime,
    plate: alarm.plate,
    alarmtext: alarm.alarmtext
  }));
  
  $: paginatedStats = alarmStats
    .slice(statsPage * itemsPerPage, (statsPage + 1) * itemsPerPage);
  
  $: paginatedVehicles = vehicleData
    .slice(performancePage * itemsPerPage, (performancePage + 1) * itemsPerPage);

  // Performance summary calculation
  $: performanceSummary = [
    { color: '#22c55e', value: vehicleData.filter(v => Number(v.ragScore) === 0).length },
    { color: '#eab308', value: vehicleData.filter(v => Number(v.ragScore) > 0 && Number(v.ragScore) < 3).length },
    { color: '#ef4444', value: vehicleData.filter(v => Number(v.ragScore) >= 3).length },
    { color: '#3b82f6', value: vehicleData.filter(v => !v.ragScore).length }
  ];

  // Pagination handlers
  const nextPage = (current, setter, totalItems) => {
    if ((current + 1) * itemsPerPage < totalItems) {
      setter(current + 1);
    }
  };

  const prevPage = (current, setter) => {
    if (current > 0) {
      setter(current - 1);
    }
  };
</script>

<div class="flex flex-col gap-4 p-4 bg-gray-100">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Alarm Widget -->
    <div class="bg-white rounded-lg shadow p-4 widget" in:fade={{ duration: 300, delay: 100 }}>
      <div class="flex justify-between items-start widget-header">
        <div class="flex items-center gap-3">
          <div class="icon-container">
            <Clock class="text-blue-800" size={24} />
          </div>
          <div>
            <h2 class="text-lg font-semibold widget-title">Alarm</h2>
            <p class="text-sm text-gray-600">Report Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <button class="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical size={20} />
        </button>
      </div>

      <div class="flex justify-between mb-6">
        <div>
          <span class="text-sm text-gray-600">Total Alarms</span>
          <div class="number-display text-2xl font-bold text-blue-500">{totalAlarms}</div>
        </div>
        <div>
          <span class="text-sm text-gray-600">Filtered Alarms</span>
          <div class="text-2xl font-bold text-orange-500">{alarmData.alarms.alarms.length}</div>
        </div>
      </div>

      <!-- Alarm items section -->
      <div class="overflow-hidden">
        {#each paginatedAlarms as alarm, i (alarm.createtime)}
          <div
            class="grid grid-cols-3 gap-6 py-3 px-4 vehicle-item border-b last:border-b-0 border-gray-100"
            in:fade={{ duration: 300, delay: i * 50 }}
            out:fade={{ duration: 200 }}
          >
            <span class="text-gray-600">{alarm.createtime.split(' ')[1]}</span>
            <span class="font-medium">{alarm.plate}</span>
            <span class="text-gray-700">{alarm.alarmtext.replace(';', '')}</span>
          </div>
        {/each}
      </div>

      <!-- Alarm Pagination -->
      <div class="flex justify-between items-center mt-4">
        <div class="flex gap-2">
          <button 
            class="action-button touch-button p-2 hover:bg-gray-100 rounded-full {alarmPage === 0 ? 'text-gray-300' : 'text-gray-600'}"
            on:click={() => prevPage(alarmPage, page => alarmPage = page)}
            disabled={alarmPage === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            class="p-2 hover:bg-gray-100 rounded-full"
            on:click={() => nextPage(alarmPage, page => alarmPage = page, alarmData.alarms.alarms.length)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Widget -->
    <div class="bg-white rounded-lg shadow p-4 widget" in:fade={{ duration: 300, delay: 100 }}>
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

      <div class="overflow-hidden relative h-80">
  <!-- Background Grid -->
  <div class="absolute left-12 top-0 right-2 h-64 flex flex-col justify-between">
    {#each Array(6) as _, i}
      <div class="w-full h-[calc(100%/5)] border-t border-gray-200 bg-gray-50"></div>
    {/each}
  </div>

  <!-- Y-axis -->
  <div class="absolute left-0 h-64 flex flex-col justify-between text-xs text-gray-500">
    {#each Array(6) as _, i}
      <div class="flex items-center">
        <span class="mr-2">{Math.round((5 - i) * Math.max(...alarmStats.map(s => s.count)) / 5)}</span>
        <div class="w-full border-t border-gray-200" style="height: 1px;"></div>
      </div>
    {/each}
  </div>

  <!-- Chart -->
  <div class="flex justify-between items-end h-64 ml-12 relative">
    {#each paginatedStats as stat}
      <div class="flex flex-col items-center" style="width: calc(100% / {paginatedStats.length})">
        <div class="h-48 flex items-end justify-center w-full">
          <div 
            class="w-12 bg-blue-500 rounded-t transition-all duration-300 chart-bar"
            in:fade={{ duration: 300, delay: 200 }}
            style="height: {(stat.count / Math.max(...alarmStats.map(s => s.count))) * 100}%"
          >
            <span class="text-xs text-white text-center block pt-1">{stat.count}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- X-axis line -->
  <div class="absolute bottom-14 left-12 right-2 h-px bg-gray-300"></div>
  
  <!-- Y-axis line -->
  <div class="absolute left-12 top-0 bottom-14 w-px bg-gray-300"></div>

  <!-- X-axis labels -->
  <div class="absolute left-12 right-2 flex justify-between" style="bottom: 0">
    {#each paginatedStats as stat}
      <div class="transform -rotate-20 font-bold origin-top-left text-xs text-gray-600 mt-4" style="width: {100/paginatedStats.length}%">
        <span class="whitespace-nowrap">{stat.type}</span>
      </div>
    {/each}
  </div>
</div>

    </div>
  </div>

  <!-- Performance Widget -->
  <div class="bg-white rounded-lg shadow p-4 widget" in:fade={{ duration: 300, delay: 100 }}>
    <div class="flex justify-between items-start widget-header">
      <div class="flex items-center gap-3">
        <div class="icon-container">
          <Truck class="text-blue-800" size={24} />
        </div>
        <div>
          <h2 class="text-lg font-semibold widget-title">Vehicle Performance</h2>
          <p class="text-sm text-gray-600">Report Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <button class="p-2 hover:bg-gray-100 rounded-full">
        <MoreVertical size={20} />
      </button>
    </div>

    <div class="flex justify-between items-center mb-6">
      <div>
        <div class="flex items-center">
          <p class="text-2xl font-medium text-black">Total score</p>
          <span class="text-5xl font-bold text-blue-500 ml-4">
            {(vehicleData.reduce((acc, v) => acc + Number(v.ragScore || 0), 0) / vehicleData.length).toFixed(2)}
          </span>
        </div>
      </div>

      <!-- Performance summary section -->
      <div class="relative flex justify-center mb-6">
  <div class="flex items-center gap-6 bg-white px-8 py-3 rounded-full border border-gray-200">
    <!-- Left border and text -->
    <div class="absolute -top-3 left-6 right-6 flex items-center justify-center">
      <span class="bg-white px-3 text-gray-600 text-sm">Performance summary</span>
    </div>
    
    <!-- Summary items -->
    {#each performanceSummary as sum}
      <div class="flex items-center gap-2">
        <span 
          class="w-2 h-2 rounded-full performance-dot" 
          style="background-color: {sum.color}"
        ></span>
        <span class="text-sm font-bold">{sum.value}</span>
      </div>
    {/each}
    
    <!-- Info icon -->
    <button class="text-gray-400 hover:text-gray-600">
      <Info size={16} />
    </button>
  </div>
</div>
    </div>

    <div class="grid md:grid-cols-2 gap-6 vehicle-list">
      <!-- Top Performing -->
      <div class="content-section">
        <h3 class="text-green-600 font-semibold section-header">Top Performing Vehicles</h3>
        {#each vehicleData
          .filter(v => Number(v.ragScore) === 0)
          .slice(0, 5)
          .sort((a, b) => Number(a.ragScore) - Number(b.ragScore)) as vehicle}
          <div class="flex items-center py-2 vehicle-item">
            <span class="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
            <span class="flex-1">
              {vehicle.plateNo.match(/\((.*?)\)/)?.[1] || vehicle.plateNo}
            </span>
            <span>{Number(vehicle.ragScore).toFixed(1)}</span>
          </div>
        {/each}
      </div>

      <!-- Low Performing -->
      <div class="content-section">
        <h3 class="text-red-600 font-semibold section-header">Low Performing Vehicles</h3>
        {#each vehicleData
          .sort((a, b) => Number(b.ragScore) - Number(a.ragScore))
          .slice(0, 5) as vehicle}
          <div class="flex items-center py-2 vehicle-item">
            <span class="w-2 h-2 rounded-full bg-red-600 mr-2"></span>
            <span class="flex-1">
              {vehicle.plateNo.match(/\((.*?)\)/)?.[1] || vehicle.plateNo}
            </span>
            <span>{Number(vehicle.ragScore).toFixed(1)}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Performance Pagination -->
    <div class="flex justify-center gap-2 mt-6 pagination-controls">
      <button 
        class="p-2 hover:bg-gray-100 rounded-full"
        on:click={() => prevPage(performancePage, page => performancePage = page)}
        disabled={performancePage === 0}
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        class="p-2 hover:bg-gray-100 rounded-full"
        on:click={() => nextPage(performancePage, page => performancePage = page, vehicleData.length)}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  </div>
</div>

<style>
  /* Keep only Tailwind classes and any component-specific styles */
</style>
