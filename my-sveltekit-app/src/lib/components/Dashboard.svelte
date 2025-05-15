<script>
  import { fade } from 'svelte/transition';
  import AlarmWidget from './widgets/AlarmWidget.svelte';
  import StatisticsWidget from './widgets/StatisticsWidget.svelte';
  import PerformanceWidget from './widgets/PerformanceWidget.svelte';
  import { onMount } from 'svelte';
  import '../styles/dashboard.css';

  // Pagination states
  let alarmPage = 0;
  let statsPage = 0;
  let performancePage = 0;
  const itemsPerPage = 6;

  // Data states
  let alarmData = { alarms: { counts: {}, alarms: [] } };
  let vehicleData = [];
  
  // Fetch data on component mount
  onMount(async () => {
    const [alarmResponse, vehicleResponse] = await Promise.all([
       fetch('/alarms_json.json'),
    fetch('/vehicle_performance_json.json')
    ]);
    
    alarmData = await alarmResponse.json();
    vehicleData = await vehicleResponse.json();
  });

  // Computed values
  $: totalAlarms = alarmData.alarms.alarms.length
  $: alarmStats = Object.entries(alarmData.alarms.counts).map(([type, count]) => ({
    type: type.replace(';', '').trim(),
    count
  }));
  
  $: paginatedAlarms = alarmData.alarms.alarms
  .slice(alarmPage * itemsPerPage, (alarmPage + 1) * itemsPerPage)
  .map(alarm => ({
    createtime: alarm.createtime,
    plate: alarm.plate,
    alarmtext: alarm.alarmtext
  }));
  
  $: paginatedStats = alarmStats
    .slice(statsPage * itemsPerPage, (statsPage + 1) * itemsPerPage);
  
  $: paginatedVehicles = vehicleData
    .slice(performancePage * itemsPerPage, (performancePage + 1) * itemsPerPage);

  // Performance summary calculation
  $: performanceSummary = [
    { color: '#22c55e', value: vehicleData.filter(v => Number(v.ragScore) === 0).length },
    { color: '#eab308', value: vehicleData.filter(v => Number(v.ragScore) > 0 && Number(v.ragScore) < 3).length },
    { color: '#ef4444', value: vehicleData.filter(v => Number(v.ragScore) >= 3).length },
    { color: '#3b82f6', value: vehicleData.filter(v => !v.ragScore).length }
  ];

  // Pagination handlers
  const nextPage = (current, setter, totalItems) => {
    if ((current + 1) * itemsPerPage < totalItems) {
      setter(current + 1);
    }
  };

  const prevPage = (current, setter) => {
    if (current > 0) {
      setter(current - 1);
    }
  };

  // Handlers for child components
  const handleAlarmNextPage = () => nextPage(alarmPage, page => alarmPage = page, alarmData.alarms.alarms.length);
  const handleAlarmPrevPage = () => prevPage(alarmPage, page => alarmPage = page);
  const handlePerformanceNextPage = () => nextPage(performancePage, page => performancePage = page, vehicleData.length);
  const handlePerformancePrevPage = () => prevPage(performancePage, page => performancePage = page);
</script>

<div class="flex flex-col gap-4 p-4 bg-gray-100">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <AlarmWidget 
      {alarmData}
      {totalAlarms}
      {paginatedAlarms}
      {alarmPage}
      onNextPage={handleAlarmNextPage}
      onPrevPage={handleAlarmPrevPage}
    />

    <StatisticsWidget 
      {alarmStats}
      {paginatedStats}
    />
  </div>

  <PerformanceWidget 
    {vehicleData}
    {performanceSummary}
    {performancePage}
    onNextPage={handlePerformanceNextPage}
    onPrevPage={handlePerformancePrevPage}
  />

  <div>
    <a href="/status" class="bg-blue-500 text-white px-4 py-2 rounded inline-block">
      Go to Vehicle Status
    </a>
  </div>
</div>



