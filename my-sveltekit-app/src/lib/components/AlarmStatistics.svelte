<script>
    import {onMount} from 'svelte'
    import { MoreVertical, Filter, RefreshCw, Clock, Activity, Truck, Info } from 'lucide-svelte';

</script>

<div>

  <div class="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col">
      <!-- Header same as above -->
      <div class="flex justify-between items-start">
        <div class="flex gap-3 items-center">
          <div class="flex items-center justify-center">
            <Activity class="text-blue-800" size={24} />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-800 m-0">Alarm Statistics</h2>
            <p class="text-sm text-gray-600 mt-1 mb-0">Report Date : 13-05-2025</p>
          </div>
        </div>
        <button class="p-1 text-gray-600 hover:bg-gray-100 rounded">
          <MoreVertical size={20} />
        </button>
      </div>
      
      <div class="h-px bg-gray-200 my-4 w-full"></div>
      
      <div class="flex-grow flex items-end justify-center px-4">
        <div class="flex items-end justify-between w-full h-[250px]">
          {#each statisticsData.data as stat}
            <div class="flex flex-col items-center flex-1">
              <div class="flex flex-col items-center justify-end h-[220px]">
                <div 
                  class="w-6 bg-blue-500 rounded-t-md" 
                  style="height: {(stat.count / maxStatValue) * 200}px"
                ></div>
                <span class="text-xs text-gray-600 mt-1">{stat.count}</span>
              </div>
              <span class="text-xs text-gray-600 mt-4 text-center -rotate-45 whitespace-nowrap max-w-[80px]">
                {stat.type}
              </span>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="flex justify-center gap-2 mt-auto pt-4">
        <button class="p-1 text-gray-600 hover:bg-gray-100 rounded">
          <Filter size={20} />
        </button>
        <button class="p-1 text-gray-600 hover:bg-gray-100 rounded">
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
    
</div>