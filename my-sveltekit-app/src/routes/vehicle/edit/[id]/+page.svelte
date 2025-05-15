<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { X, ArrowLeft } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let vehicleData = null;
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch('/asset_details_json.json');
      vehicleData = await response.json();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      loading = false;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to confirmation page with form data
    goto('/vehicle/confirm', {
      state: {
        vehicleData: {
          group: e.target.group?.value,
          plate: e.target.plate?.value,
          adasId: e.target.adasId?.value,
          trackerType: e.target.trackerType?.value,
          gpsId: e.target.gpsId?.value,
          simNo: e.target.simNo?.value,
          timezone: e.target.timezone?.value,
          engineNo: e.target.engineNo?.value,
          chassisNo: e.target.chassisNo?.value,
          baseMileage: e.target.baseMileage?.value,
          model: e.target.model?.value,
          brand: e.target.brand?.value,
          engineFuel: e.target.engineFuel?.value
        }
      }
    });
  };
</script>

<div class="min-h-screen bg-gray-900 p-6" in:fade={{ duration: 300 }}>
  <div class="max-w-5xl mx-auto">
    <!-- Back Button -->
    <button 
      class="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      on:click={() => goto('/')}
    >
      <ArrowLeft size={20} />
      <span>Back to Dashboard</span>
    </button>

    <div class="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
      <!-- Header -->
      <div class="bg-gray-800/50 backdrop-blur-sm px-8 py-6 border-b border-gray-700 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-white">Vehicle Details</h2>
        <button 
          class="p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-all"
          on:click={() => goto('/')}
        >
          <X size={20} />
        </button>
      </div>

      {#if loading}
        <div class="p-8 text-gray-400">Loading...</div>
      {:else if vehicleData}
        <form on:submit={handleSubmit} class="p-8">
          <!-- Section Headers Style -->
          <div class="space-y-8">
            <!-- Vehicle Identification -->
            <div class="space-y-6">
              <div class="flex items-center gap-2">
                <div class="h-px flex-1 bg-gray-700"></div>
                <h3 class="text-lg font-medium text-white px-4">Vehicle Identification</h3>
                <div class="h-px flex-1 bg-gray-700"></div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Input fields with updated styling -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Select Group</label>
                  <select class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all">
                    <option>OzoneCars</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Plate No*</label>
                  <input 
                    type="text" 
                    bind:value={vehicleData.plate}
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Adas Id</label>
                  <input 
                    type="text" 
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all"
                  />
                </div>
              </div>
            </div>

            <!-- Tracker Details -->
            <div class="space-y-6">
              <div class="flex items-center gap-2">
                <div class="h-px flex-1 bg-gray-700"></div>
                <h3 class="text-lg font-medium text-white px-4">Tracker Details</h3>
                <div class="h-px flex-1 bg-gray-700"></div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Input Template -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">
                    Type
                    <span class="text-blue-400">*</span>
                  </label>
                  <select class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all">
                    <option value="">Select type</option>
                    <option>GT-X1</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">GPS Id*</label>
                  <input 
                    type="text" 
                    bind:value={vehicleData.imeino}
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">SIM No*</label>
                  <input 
                    type="text" 
                    placeholder="96898582614"
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 placeholder-gray-400 transition-all"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Satellite Id</label>
                  <input 
                    type="text" 
                    placeholder="MT-01"
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 placeholder-gray-400 transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Map</label>
                  <select class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all">
                    <option>Choose Map</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Time Zone</label>
                  <input 
                    type="number" 
                    bind:value={vehicleData.timezone}
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all"
                  />
                </div>
              </div>
            </div>

            <!-- Vehicle Details -->
            <div class="space-y-6">
              <div class="flex items-center gap-2">
                <div class="h-px flex-1 bg-gray-700"></div>
                <h3 class="text-lg font-medium text-white px-4">Vehicle Details</h3>
                <div class="h-px flex-1 bg-gray-700"></div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Modern Input Styling -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Engine No</label>
                  <input 
                    type="text"
                    placeholder="Enter engine no"
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 placeholder-gray-400 transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Chassis No</label>
                  <input 
                    type="text"
                    placeholder="Enter chassis no"
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 placeholder-gray-400 transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Base Mileage</label>
                  <input 
                    type="number"
                    placeholder="60732"
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 placeholder-gray-400 transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Purchase Value</label>
                  <input 
                    type="number"
                    placeholder="0"
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 placeholder-gray-400 transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Manufacture Date</label>
                  <input 
                    type="date"
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Expiry Date</label>
                  <input 
                    type="date"
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Type</label>
                  <select class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all">
                    <option>Car</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Category</label>
                  <select class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all">
                    <option>Light Vehicle</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Model</label>
                  <input 
                    type="text"
                    placeholder="NISSAN SUNNY"
                    class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 placeholder-gray-400 transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Brand</label>
                  <select class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all">
                    <option value="">Select brand</option>
                    <option>Nissan</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Color</label>
                  <select class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all">
                    <option>Choose color</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">Engine Fuel</label>
                  <select class="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 transition-all">
                    <option value="">Select fuel type</option>
                    <option>Diesel</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end gap-4 pt-6 border-t border-gray-700">
              <button
                type="button"
                class="px-6 py-2.5 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
                on:click={() => goto('/')}
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Custom Scrollbar */
  :global(body) {
    scrollbar-width: thin;
    scrollbar-color: #4b5563 #1f2937;
  }
  
  :global(::-webkit-scrollbar) {
    width: 8px;
  }
  
  :global(::-webkit-scrollbar-track) {
    background: #1f2937;
  }
  
  :global(::-webkit-scrollbar-thumb) {
    background-color: #4b5563;
    border-radius: 4px;
  }

  /* Input Autofill Styles */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: #e5e7eb;
    -webkit-box-shadow: 0 0 0px 1000px #374151 inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* Date Input Styling */
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
</style>