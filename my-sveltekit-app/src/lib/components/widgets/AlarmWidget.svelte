<script>
  import { fade } from 'svelte/transition';
  import { Clock, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-svelte';
  
  export let alarmData;
  export let totalAlarms;
  export let paginatedAlarms;
  export let alarmPage;
  export let onNextPage;
  export let onPrevPage;
</script>

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

  <div class="flex justify-between items-center mt-4">
    <div class="flex gap-2">
      <button 
        class="action-button touch-button p-2 hover:bg-gray-100 rounded-full {alarmPage === 0 ? 'text-gray-300' : 'text-gray-600'}"
        on:click={onPrevPage}
        disabled={alarmPage === 0}
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        class="p-2 hover:bg-gray-100 rounded-full"
        on:click={onNextPage}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  </div>
</div>