// weather.js
let weatherData = null;

async function fetchWeather() {
  try {
    const pos = await new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej, { timeout: 10000 });
    });
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
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
  } catch (e) {
    document.getElementById('weather-display').innerHTML = `<p style="color:red;">Unable to load weather.</p>`;
  }
}
