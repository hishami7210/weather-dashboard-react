export default function WeatherCard({ data, unit }) {
    const tempUnit = unit === "imperial" ? "°F" : "°C";
  
    return (
      <div className="card">
        <h2>{data.name}</h2>
        <p className="temp">
          {Math.round(data.main.temp)}
          {tempUnit}
        </p>
        <p>{data.weather[0].description}</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed}</p>
      </div>
    );
  }