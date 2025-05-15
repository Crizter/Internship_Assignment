<script>
  import { fade } from 'svelte/transition';
  import { ArrowLeft, Check, X } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // Get the form data from URL state
  let vehicleData = $page.state.vehicleData || null;

  const handleConfirm = () => {
    console.log('Changes confirmed:', vehicleData);
    goto('/');
  };
</script>

<div class="min-h-screen bg-gray-900 p-6" in:fade={{ duration: 300 }}>
  <div class="max-w-3xl mx-auto">
    <!-- Back Button -->
    <button 
      class="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      on:click={() => history.back()}
    >
      <ArrowLeft size={20} />
      <span>Back to Edit</span>
    </button>

    <div class="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
      <!-- Header -->
      <div class="bg-gray-800/50 backdrop-blur-sm px-8 py-6 border-b border-gray-700">
        <h2 class="text-xl font-semibold text-white">Confirm Changes</h2>
        <p class="text-sm text-gray-400 mt-1">Please review the changes before confirming</p>
      </div>

      <div class="p-8">
        <!-- Summary Sections -->
        <div class="space-y-8">
          <!-- Vehicle Identification -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-white">Vehicle Identification</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="space-y-4">
                <div>
                  <span class="text-gray-400">Group:</span>
                  <span class="text-white ml-2">{vehicleData?.group || 'OzoneCars'}</span>
                </div>
                <div>
                  <span class="text-gray-400">Plate No:</span>
                  <span class="text-white ml-2">{vehicleData?.plate || '-'}</span>
                </div>
                <div>
                  <span class="text-gray-400">Adas Id:</span>
                  <span class="text-white ml-2">{vehicleData?.adasId || '-'}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tracker Details -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-white">Tracker Details</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-400">Type:</span>
                <span class="text-white ml-2">{vehicleData?.trackerType || 'GT-X1'}</span>
              </div>
              <div>
                <span class="text-gray-400">GPS Id:</span>
                <span class="text-white ml-2">{vehicleData?.gpsId || '-'}</span>
              </div>
              <div>
                <span class="text-gray-400">SIM No:</span>
                <span class="text-white ml-2">{vehicleData?.simNo || '-'}</span>
              </div>
              <div>
                <span class="text-gray-400">Time Zone:</span>
                <span class="text-white ml-2">{vehicleData?.timezone || '0'}</span>
              </div>
            </div>
          </div>

          <!-- Vehicle Details -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-white">Vehicle Details</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-400">Engine No:</span>
                <span class="text-white ml-2">{vehicleData?.engineNo || '-'}</span>
              </div>
              <div>
                <span class="text-gray-400">Chassis No:</span>
                <span class="text-white ml-2">{vehicleData?.chassisNo || '-'}</span>
              </div>
              <div>
                <span class="text-gray-400">Base Mileage:</span>
                <span class="text-white ml-2">{vehicleData?.baseMileage || '0'}</span>
              </div>
              <div>
                <span class="text-gray-400">Model:</span>
                <span class="text-white ml-2">{vehicleData?.model || 'NISSAN SUNNY'}</span>
              </div>
              <div>
                <span class="text-gray-400">Brand:</span>
                <span class="text-white ml-2">{vehicleData?.brand || 'Nissan'}</span>
              </div>
              <div>
                <span class="text-gray-400">Engine Fuel:</span>
                <span class="text-white ml-2">{vehicleData?.engineFuel || 'Diesel'}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              class="px-6 py-2.5 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 flex items-center gap-2"
              on:click={() => history.back()}
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
            <button
              type="button"
              class="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
              on:click={handleConfirm}
            >
              <Check size={18} />
              <span>Confirm Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>