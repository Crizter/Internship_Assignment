<script>
  import {onMount} from 'svelte'
  import { MoreVertical, Filter, RefreshCw, Clock, Activity, Truck, Info } from 'lucide-svelte';
  </script>


<div>

  <!-- Vehicle Performance Widget -->
  <div class="w-full bg-white rounded-lg shadow-sm p-4 flex flex-col">
    <div class="flex justify-between items-start">
      <div class="flex gap-3 items-center">
        <div class="flex items-center justify-center">
          <Truck class="text-blue-800" size={24} />
        </div>
        <div>
          <h2 class="text-lg font-semibold text-gray-800 m-0">Vehicle Performance</h2>
          <p class="text-sm text-gray-600 mt-1 mb-0">Report Date : 12-05-2025</p>
        </div>
      </div>
      <button class="p-1 text-gray-600 hover:bg-gray-100 rounded">
        <MoreVertical size={20} />
      </button>
    </div>
    
    <div class="h-px bg-gray-200 my-4 w-full"></div>
    
    <div class="flex justify-between mb-6">
      <div class="flex items-center">
        <div class="flex flex-col">
          <span class="text-base text-gray-600">Total Score</span>
          <span class="text-3xl font-bold text-blue-500">{performanceData.totalScore}</span>
        </div>
      </div>
      
      <div class="flex flex-col items-end">
        <span class="text-sm text-gray-600 mb-2">Performance summary</span>
        <div class="flex gap-4 items-center bg-gray-50 px-4 py-2 rounded-full">
          {#each performanceData.summary as item}
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full" style="background-color: {item.color}"></span>
              <span class="text-sm font-semibold">{item.value}</span>
            </div>
          {/each}
          <button class="p-1 text-gray-600 hover:bg-gray-100 rounded">
            <Info size={16} />
          </button>
        </div>
      </div>
    </div>
    
    <div class="grid md:grid-cols-2 grid-cols-1 gap-6 mb-4">
      <div class="flex flex-col">
        <h3 class="text-base font-semibold text-green-600 mb-4 m-0">Top Performing Vehicles</h3>
        {#each performanceData.topVehicles as vehicle}
          <div class="flex items-center py-2">
            <div class="mr-2">
              <span class="w-2 h-2 rounded-full bg-green-600 inline-block"></span>
            </div>
            <span class="flex-1 text-sm">{vehicle.vehicle}</span>
            <span class="text-sm font-medium">{vehicle.score?.toFixed?.(1) ?? '0.0'}</span>
          </div>
        {/each}
      </div>
      
      <div class="flex flex-col">
        <h3 class="text-base font-semibold text-red-600 mb-4 m-0">Low Performing Vehicles</h3>
        {#each performanceData.lowVehicles as vehicle}
          <div class="flex items-center py-2">
            <div class="mr-2">
              <span class="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
            </div>
            <span class="flex-1 text-sm">{vehicle.vehicle}</span>
            <span class="text-sm font-medium">{vehicle.score?.toFixed?.(2) ?? '0.00'}</span>
          </div>
        {/each}
      </div>
    </div>
    
    <div class="flex justify-center gap-2">
      <button class="p-1 text-gray-600 hover:bg-gray-100 rounded">
        <Filter size={20} />
      </button>
      <button class="p-1 text-gray-600 hover:bg-gray-100 rounded">
        <RefreshCw size={20} />
      </button>
    </div>
  </div>

</div>