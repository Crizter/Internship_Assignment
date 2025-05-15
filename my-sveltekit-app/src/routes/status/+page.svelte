<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import VehicleStatusWidget from '$lib/components/widgets/VehicleStatusWidget.svelte';

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
          case 'R': statusData.running++; break;
          case 'S': statusData.assetOff++; break;
          case 'N': statusData.noData++; break;
          case 'I': statusData.idling++; break;
          case 'O': statusData.offline++; break;
          case 'M': statusData.immobilized++; break;
          default: statusData.noData++;
        }
      });

      // Force reactivity
      statusData = { ...statusData };
    } catch (error) {
      console.error('Error loading vehicle status data:', error);
    }
  });

  $: totalAssets = vehicleStatusData.length;
</script>

<div class="p-6 bg-gray-50 min-h-screen">
  <VehicleStatusWidget 
    {vehicleStatusData}
    {statusData}
    {totalAssets}
  />
</div>


