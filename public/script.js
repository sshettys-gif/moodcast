// Run only on Home page
if (document.getElementById('weather-display')) {

  let weatherData = null;
  let chart = null;
  let moodEntries = [];

  const moodValues = {
    happy: 5,
    excited: 4,
    calm: 3,
    nervous: 2,
    sad: 1,
    angry: 0
  };

  //fetch weather
  async function fetchWeather() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const data = await res.json();

      weatherData = {
        temperature: data.current_weather.temperature,
        condition: 'Clear'
      };

      document.getElementById('weather-display').innerHTML = `
        <h3>${weatherData.temperature}°C</h3>
        <p>${weatherData.condition}</p>
      `;
    } catch (err) {
      document.getElementById('weather-display').innerHTML =
        `<p style="color:red;">Unable to load weather.</p>`;
    }
  }

  
  async function fetchEntries() {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .order('entry_date', { ascending: true });

    if (error) {
      console.error('Fetch error:', error);
      return;
    }

    moodEntries = data;
    updateChart();
  }

 
  async function saveEntry() {
    if (!weatherData) return;

    const mood = document.getElementById('mood-select').value;

    const entry = {
      entry_date: dayjs().format('YYYY-MM-DD'),
      mood: mood,
      temperature: Math.round(weatherData.temperature),
      weather: weatherData.condition
    };

    const { error } = await supabase
      .from('mood_entries')
      .insert([entry]);

    if (error) {
      console.error('Insert error:', error);
      return;
    }

    fetchEntries();
  }

  document
    .getElementById('save-entry')
    .addEventListener('click', saveEntry);

  //chartjs
  function updateChart() {
    const ctx = document
      .getElementById('mood-chart')
      .getContext('2d');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: moodEntries.map(e =>
          dayjs(e.entry_date).format('MMM D')
        ),
        datasets: [{
          label: 'Mood',
          data: moodEntries.map(e => moodValues[e.mood] || 0),
          borderColor: '#FF69B4',
          backgroundColor: 'rgba(255,105,180,0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

 
  fetchWeather();
  fetchEntries();
}
