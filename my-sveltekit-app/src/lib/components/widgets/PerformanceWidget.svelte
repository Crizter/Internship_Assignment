<script>
  import { fade } from 'svelte/transition';
  import { Truck, MoreVertical, Info, ChevronLeft, ChevronRight } from 'lucide-svelte';
  
  export let vehicleData;
  export let performanceSummary;
  export let performancePage;
  export let onNextPage;
  export let onPrevPage;

  // Calculate total score
  $: totalScore = (vehicleData.reduce((acc, v) => acc + Number(v.ragScore || 0), 0) / vehicleData.length).toFixed(2);

  // Get top and low performing vehicles
  $: topPerforming = vehicleData
    .filter(v => Number(v.ragScore) === 0)
    .slice(0, 5)
    .sort((a, b) => Number(a.ragScore) - Number(b.ragScore));

  $: lowPerforming = vehicleData
    .filter(v => Number(v.ragScore) >= 3)
    .slice(0, 5)
    .sort((a, b) => Number(b.ragScore) - Number(a.ragScore));
</script>

<div class="bg-white rounded-lg shadow p-4 widget" in:fade={{ duration: 300, delay: 100 }}>
  <!-- Header -->
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

  <!-- Performance Summary Section -->
  <div class="mb-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
      <!-- Total Score -->
      <div class="flex items-center mb-4 md:mb-0">
        <p class="text-2xl font-medium text-black">Total Score</p>
        <span class="text-5xl font-bold text-blue-500 ml-4">{totalScore}</span>
      </div>

      <!-- Performance Summary Pills -->
      <div class="relative flex justify-center w-full md:w-auto">
        <div class="flex items-center gap-3 md:gap-6 bg-white px-4 md:px-8 py-2 md:py-3 rounded-full border border-gray-200 overflow-x-auto">
          {#each performanceSummary as sum}
            <div class="flex items-center gap-2 whitespace-nowrap">
              <span class="w-2 h-2 rounded-full performance-dot" style="background-color: {sum.color}"></span>
              <span class="text-xs md:text-sm font-bold">{sum.value}</span>
            </div>
          {/each}
          <button class="text-gray-400 hover:text-gray-600 ml-2">
            <Info size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Vehicle Lists -->
  <div class="grid md:grid-cols-2 gap-6">
    <!-- Top Performing -->
    <div class="performance-list">
      <h3 class="text-green-600 font-semibold mb-4">Top Performing Vehicles</h3>
      {#each topPerforming as vehicle}
        <div class="flex items-center py-2 vehicle-item" in:fade={{ duration: 300 }}>
          <span class="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
          <span class="flex-1 truncate">{vehicle.plateNo}</span>
          <span class="ml-2">{Number(vehicle.ragScore).toFixed(1)}</span>
        </div>
      {/each}
    </div>

    <!-- Low Performing -->
    <div class="performance-list">
      <h3 class="text-red-600 font-semibold mb-4">Low Performing Vehicles</h3>
      {#each lowPerforming as vehicle}
        <div class="flex items-center py-2 vehicle-item" in:fade={{ duration: 300 }}>
          <span class="w-2 h-2 rounded-full bg-red-600 mr-2"></span>
          <span class="flex-1 truncate">{vehicle.plateNo}</span>
          <span class="ml-2">{Number(vehicle.ragScore).toFixed(1)}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Pagination Controls -->
  <div class="flex justify-center gap-2 mt-6">
    <button 
      class="action-button p-2 hover:bg-gray-100 rounded-full {performancePage === 0 ? 'text-gray-300' : 'text-gray-600'}"
      on:click={onPrevPage}
      disabled={performancePage === 0}
    >
      <ChevronLeft size={20} />
    </button>
    <button 
      class="action-button p-2 hover:bg-gray-100 rounded-full text-gray-600"
      on:click={onNextPage}
    >
      <ChevronRight size={20} />
    </button>
  </div>
</div>

<style>
  /* Performance list styling */
  .performance-list {
    background: linear-gradient(to right, #ffffff, #f8fafc);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .vehicle-item {
    transition: all 0.2s ease;
    padding: 0.5rem;
    border-radius: 0.375rem;
  }

  .vehicle-item:hover {
    background-color: #f1f5f9;
    transform: translateX(4px);
  }

  /* Performance dots animation */
  .performance-dot {
    transition: transform 0.2s ease;
  }

  .performance-dot:hover {
    transform: scale(1.5);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .performance-list {
      margin-bottom: 1rem;
    }
  }
</style>