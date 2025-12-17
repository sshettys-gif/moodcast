let moodEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
const moodValues = { happy:5, excited:4, calm:3, nervous:2, sad:1, angry:0 };
let chart = null;

function saveEntry() {
  const mood = document.getElementById('mood-select').value;
  if (!mood || !weatherData) return;

  const entry = {
    date: new Date().toISOString().split('T')[0],
    mood,
    temperature: weatherData.temperature
  };

  moodEntries = moodEntries.filter(e => e.date !== entry.date);
  moodEntries.push(entry);
  localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  updateChart();
}

function updateChart() {
  const sorted = [...moodEntries].sort((a,b)=> new Date(a.date)-new Date(b.date)).slice(-14);
  const ctx = document.getElementById('mood-chart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sorted.map(e => e.date),
      datasets: [
        { label:'Mood', data: sorted.map(e => moodValues[e.mood]), borderColor:'#FF69B4', backgroundColor:'rgba(255,105,180,0.1)', fill:true }
      ]
    }
  });
}
