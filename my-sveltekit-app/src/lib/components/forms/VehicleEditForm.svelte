<script>
  import { fade } from 'svelte/transition';
  import { X } from 'lucide-svelte';
  
  export let isOpen = false;
  export let vehicleData;
  export let onClose;

  let formData = { ...vehicleData };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };
</script>

{#if isOpen}
<div class="fixed inset-0 bg-black bg-opacity-50 z-40" on:click={onClose} transition:fade></div>
<div 
  class="fixed inset-0 z-50 flex items-center justify-center p-4"
  transition:fade
>
  <div 
    class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
    on:click|stopPropagation
  >
    <!-- Form Header -->
    <div class="flex justify-between items-center p-6 border-b">
      <h2 class="text-xl font-semibold">Vehicle Details</h2>
      <button class="p-2 hover:bg-gray-100 rounded-full" on:click={onClose}>
        <X size={20} />
      </button>
    </div>

    <!-- Form Content -->
    <form on:submit={handleSubmit} class="p-6">
      <!-- Vehicle Identification -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">Vehicle Identification</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Select Group</label>
            <input 
              type="text" 
              bind:value={formData.teamName}
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Plate No*</label>
            <input 
              type="text" 
              bind:value={formData.plate}
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Adas Id</label>
            <input 
              type="text" 
              bind:value={formData.adasid}
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Tracker Details -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">Tracker Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Type*</label>
            <input 
              type="text" 
              value="GT-X1"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">GPS Id*</label>
            <input 
              type="text" 
              bind:value={formData.imeino}
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">SIM No*</label>
            <input 
              type="text" 
              bind:value={formData.simno}
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <!-- Vehicle Details -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">Vehicle Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Type</label>
            <input 
              type="text" 
              bind:value={formData.ctype}
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Brand</label>
            <input 
              type="text" 
              bind:value={formData.brand}
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Model</label>
            <input 
              type="text" 
              bind:value={formData.model}
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end gap-4 mt-8 pt-4 border-t">
        <button
          type="button"
          class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          on:click={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>
{/if}

<style>
  /* Add any additional styling here */
</style>