import React from "react";

function WeatherCard({ weather, unit }) {
  if (!weather || !weather.main) return null;

  const { name, main, weather: weatherDetails } = weather;
  const { temp, temp_min, temp_max, humidity } = main;
  const { description, icon } = weatherDetails[0];

  // Use unit prop for display
  const symbol = unit === "imperial" ? "°F" : "°C";

  return (
    <div className="weather-card" style={cardStyle}>
      <h2 style={titleStyle}>{name}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        style={iconStyle}
      />

      <p style={tempStyle}>{Math.round(temp)}{symbol}</p>
      <p style={descStyle}>{description}</p>
      <p style={extraStyle}>
        H: {Math.round(temp_max)}{symbol} | L: {Math.round(temp_min)}{symbol} | Humidity: {humidity}%
      </p>
    </div>
  );
}

// Inline styles (optional)
const cardStyle = {
  backgroundColor: "#f0f8ff",
  borderRadius: "12px",
  padding: "20px",
  textAlign: "center",
  width: "220px",
  margin: "10px auto",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};

const titleStyle = { margin: "0", fontSize: "1.5rem" };
const iconStyle = { width: "100px", height: "100px" };
const tempStyle = { fontSize: "2rem", margin: "10px 0" };
const descStyle = { margin: "5px 0", textTransform: "capitalize" };
const extraStyle = { fontSize: "0.85rem", color: "#555" };

export default WeatherCard;
