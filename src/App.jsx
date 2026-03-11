import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import ToggleUnit from "./components/ToggleUnit";

const API_KEY = "3edaffdad91e48aac3b6f2925f788ba8"; // replace with your key

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("imperial"); // "imperial" = °F, "metric" = °C
  const [recentSearches, setRecentSearches] = useState([]);
  const [lastCity, setLastCity] = useState("");

  const fetchWeather = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        alert("City not found");
        return;
      }

      setWeatherData(data);
      setLastCity(city);

      setRecentSearches((prev) => {
        const updated = [city, ...prev.filter((c) => c !== city)];
        return updated.slice(0, 5);
      });
    } catch (err) {
      console.error(err);
      alert("Error fetching weather");
    }
  };

  // Re-fetch last city when unit changes
  useEffect(() => {
    if (lastCity) fetchWeather(lastCity);
  }, [unit]);

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <SearchBar onSearch={fetchWeather} />
      <ToggleUnit unit={unit} setUnit={setUnit} />

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h3>Recent Searches:</h3>
          <ul>
            {recentSearches.map((city) => (
              <li key={city} onClick={() => fetchWeather(city)}>
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pass the unit prop */}
      {weatherData && <WeatherCard weather={weatherData} unit={unit} />}
    </div>
  );
}

export default App;
