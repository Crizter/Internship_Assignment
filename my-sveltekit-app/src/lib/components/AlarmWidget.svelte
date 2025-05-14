<script>
  import { MoreVertical, Filter, RefreshCw, Clock } from 'lucide-svelte';
  
  export let totalAlarms;
  export let filteredAlarms;
  export let alarmList;
  
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
</script>




<div class="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col">
  <div class="flex justify-between items-start">
    <div class="flex gap-3 items-center">
      <div class="flex items-center justify-center">
        <Clock class="text-blue-800" size={24} />
      </div>
      <div>
        <h2 class="text-lg font-semibold text-gray-800 m-0">Alarm</h2>
        <p class="text-sm text-gray-600 mt-1 mb-0">Report Date : 13-05-2025</p>
      </div>
    </div>
    <button class="p-1 text-gray-600 hover:bg-gray-100 rounded-full">
      <MoreVertical size={20} />
    </button>
  </div>
  
  <div class="h-px bg-gray-200 my-4 w-full"></div>
  
  <div class="flex justify-between mb-4">
    <div class="flex flex-col">
      <span class="text-base text-gray-600">Total Alarms</span>
      <span class="text-3xl font-bold text-blue-500">{formatNumber(totalAlarms)}</span>
    </div>
    <div class="flex flex-col">
      <span class="text-base text-gray-600">Filtered alarms</span>
      <span class="text-3xl font-bold text-orange-500">{formatNumber(filteredAlarms)}</span>
    </div>
  </div>
  
  <div class="flex-grow flex flex-col">
    {#each alarmList as alarm, i}
      <div class="grid grid-cols-[0.8fr_1.2fr_1fr] py-2 px-3 text-sm {i % 2 === 0 ? 'bg-gray-50' : ''}">
        <span>{alarm.time}</span>
        <span>{alarm.vehicle}</span>
        <span>{alarm.type}</span>
      </div>
    {/each}
  </div>
  
  <div class="mt-4 flex justify-between items-end">
    <div class="text-xs leading-relaxed">
      <p class="text-red-500">Filters Applied- Date: 13-05-2025</p>
      <p class="text-red-500">Selected Categories: General Info- 1842</p>
    </div>
    <div class="flex gap-2">
      <button class="p-1 text-gray-600 hover:bg-gray-100 rounded-full">
        <Filter size={20} />
      </button>
      <button class="p-1 text-gray-600 hover:bg-gray-100 rounded-full">
        <RefreshCw size={20} />
      </button>
    </div>
  </div>
</div>