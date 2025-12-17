if (document.getElementById('weather-display')) {
  let weatherData = null;
  let moodEntries = [];
  let chart = null;

  const moodValues = { happy:5, excited:4, calm:3, nervous:2, sad:1, angry:0 };
  const moodColors = { happy:'#FFD700', excited:'#FF69B4', calm:'#87CEEB', nervous:'#FFA500', sad:'#4169E1', angry:'#DC143C' };

  // Fetch weather using geolocation
  async function fetchWeather() {
    try {
      const pos = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, { timeout:10000 });
      });
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      const resp = await fetch(url);
      const data = await resp.json();

      weatherData = {
        temperature: data.current_weather.temperature,
        condition: { text: 'Clear', icon: '☀️' }
      };

      document.getElementById('weather-display').innerHTML = `
        <div class="weather-icon">${weatherData.condition.icon}</div>
        <div class="weather-info">
          <h3>${weatherData.temperature}°C</h3>
          <p>${weatherData.condition.text}</p>
        </div>
      `;
    } catch(e) {
      document.getElementById('weather-display').innerHTML = `<p style="color:red;">Unable to load weather.</p>`;
    }
  }

  // Fetch mood entries from Supabase
  async function fetchEntries() {
    const { data, error } = await supabase.from('mood_entries').select('*').order('entry_date', { ascending: true });
    if (error) {
      console.error(error);
      return;
    }
    moodEntries = data;
    updateChart();
  }

  // Save mood entry to Supabase
  async function saveEntry() {
    if (!weatherData) return;

    const entry = {
      entry_date: new Date().toISOString().split('T')[0],
      mood: document.getElementById('mood-select').value,
      temperature: weatherData.temperature,
      weather: weatherData.condition.text
    };

    const { error } = await supabase.from('mood_entries').insert([entry]);
    if (error) {
      console.error(error);
      return;
    }
    fetchEntries();
  }

  // Update Chart.js chart
  function updateChart() {
    const sorted = [...moodEntries].sort((a,b)=> new Date(a.entry_date)-new Date(b.entry_date)).slice(-14);
    const ctx = document.getElementById('mood-chart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sorted.map(e => e.entry_date),
        datasets: [{
          label: 'Mood',
          data: sorted.map(e => moodValues[e.mood] || 0),
          borderColor: '#FF69B4',
          backgroundColor: 'rgba(255,105,180,0.1)',
          fill: true
        }]
      }
    });
  }

  document.getElementById('save-entry').addEventListener('click', saveEntry);

  fetchWeather();
  fetchEntries();
}
