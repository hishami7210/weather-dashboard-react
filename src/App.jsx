import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = "3edaffdad91e48aac3b6f2925f788ba8";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("imperial");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "imperial" ? "metric" : "imperial"));
    if (weather) fetchWeather(weather.name);
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <SearchBar onSearch={fetchWeather} />

      <button className="toggle" onClick={toggleUnit}>
        Switch to {unit === "imperial" ? "°C" : "°F"}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard data={weather} unit={unit} />}
    </div>
  );
}