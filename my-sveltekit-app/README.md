# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

Project structure 
my-sveltekit-app/
├── src/
    |--components/Dashboard.svelte
│   ├── routes/
│   │   ├── +layout.svelte
│   │   └── +page.svelte 
│   ├── app.css
│   └── app.html
├── e2e/
│   └── demo.test.js
├── .svelte-kit/
│   ├── ambient.d.ts
│   ├── non-ambient.d.ts
│   └── tsconfig.json
├── .npmrc
├── .prettierignore
├── .prettierrc
├── eslint.config.js
├── jsconfig.json
├── package.json
├── playwright.config.js
├── README.md
├── svelte.config.js
└── vite.config.js

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.



<script>
  import { onMount } from 'svelte';
  import { MoreVertical, Filter, RefreshCw, Clock, Activity, Truck, Info } from 'lucide-svelte';
  
  let alarmData = {
    totalAlarms: 0,
    filteredAlarms: 0,
    alarms: []
  };
  
  let statisticsData = {
    data: []
  };
  
  let performanceData = {
    totalScore: 0,
    summary: {
      green: 0,
      yellow: 0,
      red: 0,
      grey: 0
    },
    topVehicles: [],
    lowVehicles: []
  };

  // Add this new variable
  let maxStatValue = 0;

  onMount(async () => {
    try {
      // Fetch alarms data
      const alarmsResponse = await fetch('/alarms_json.json');
      const alarmsJson = await alarmsResponse.json();
      
      // Process alarms data
      const { alarms } = alarmsJson;
      alarmData = {
        totalAlarms: Object.values(alarms.counts).reduce((a, b) => a + b, 0),
        filteredAlarms: alarms.alarms.length,
        alarms: alarms.alarms.map(alarm => ({
          time: alarm.createtime.split(' ')[1],
          vehicle: alarm.plate,
          type: alarm.alarmtext.trim()
        }))
      };

      // Process statistics data
      statisticsData.data = Object.entries(alarms.counts).map(([type, count]) => ({
        label: type.trim(),
        value: count
      }));

      // Calculate maxStatValue after processing statistics data
      maxStatValue = Math.max(...statisticsData.data.map(stat => stat.value));

      // Fetch vehicle performance data
      const performanceResponse = await fetch('/vehicle_performance_json.json');
      const vehicleData = await performanceResponse.json();
      
      // Process performance data
      const sortedVehicles = [...vehicleData]
        .filter(v => v.ragScore != null) // Filter out null/undefined values
        .sort((a, b) => Number(a.ragScore) - Number(b.ragScore)); // Ensure numbers for sorting
      
      const summary = vehicleData.reduce((acc, vehicle) => {
        const score = Number(vehicle.ragScore) || 0; // Convert to number, default to 0
        if (score === 0) acc.green++;
        else if (score < 3) acc.yellow++;
        else if (score > 3) acc.red++;
        else acc.grey++;
        return acc;
      }, { green: 0, yellow: 0, red: 0, grey: 0 });

      performanceData = {
        totalScore: (vehicleData
          .reduce((sum, v) => sum + (Number(v.ragScore) || 0), 0) / vehicleData.length)
          .toFixed(2),
        summary,
        topVehicles: sortedVehicles.slice(0, 5).map(v => ({
          vehicle: v.plateNo || 'Unknown',
          score: Number(v.ragScore) || 0
        })),
        lowVehicles: sortedVehicles.slice(-5).reverse().map(v => ({
          vehicle: v.plateNo || 'Unknown',
          score: Number(v.ragScore) || 0
        }))
      };
    } catch (error) {
      console.error('Error loading data:', error);
    }
  });

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
</script>

<div class="flex flex-col gap-4 p-4 bg-gray-100 font-inter">
  <div class="flex gap-4 w-full md:flex-row flex-col">
    <!-- Alarm Widget -->
    <div class="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col">
      <div class="flex justify-between items-start">
        <div class="flex gap-3 items-center">
          <div class="flex items-center justify-center">
            <Clock class="text-blue-800" size={24} />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-800 m-0">Alarm</h2>
            <p class="text-sm text-gray-600 mt-1 mb-0">Report Date : {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <button class="p-1 text-gray-600 hover:bg-gray-100 rounded">
          <MoreVertical size={20} />
        </button>
      </div>
      
      <div class="h-px bg-gray-200 my-4 w-full"></div>
      
      <div class="flex justify-between mb-4">
        <div class="flex flex-col">
          <span class="text-base text-gray-600">Total Alarms</span>
          <span class="text-3xl font-bold text-blue-500">{formatNumber(alarmData.totalAlarms)}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-base text-gray-600">Filtered alarms</span>
          <span class="text-3xl font-bold text-orange-500">{formatNumber(alarmData.filteredAlarms)}</span>
        </div>
      </div>
      
      <div class="flex flex-col flex-grow">
        {#each alarmData.alarms as alarm, i}
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
          <button class="p-1 text-gray-600 hover:bg-gray-100 rounded">
            <Filter size={20} />
          </button>
          <button class="p-1 text-gray-600 hover:bg-gray-100 rounded">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Alarm Statistics Widget -->
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