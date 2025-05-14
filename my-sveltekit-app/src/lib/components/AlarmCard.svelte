<script>
  export let alarmData;
</script>

<div class="card">
  <header>
    <div class="title">
      <span class="icon">⏰</span>
      <h2>Alarm</h2>
    </div>
    <span class="date">Report Date: {new Date().toLocaleDateString()}</span>
  </header>

  <div class="stats">
    <div class="total">
      <span>Total Alarms</span>
      <h3>{alarmData.totalAlarms}</h3>
    </div>
    <div class="filtered">
      <span>Filtered alarms</span>
      <h3>{alarmData.filteredAlarms}</h3>
    </div>
  </div>

  <div class="alarm-list">
    {#each alarmData.alarms as alarm}
      <div class="alarm-item">
        <span class="time">{alarm.time}</span>
        <span class="vehicle">{alarm.vehicle}</span>
        <span class="type">{alarm.type}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .card {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
  }

  .alarm-list {
    max-height: 300px;
    overflow-y: auto;
  }

  .alarm-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }
</style>