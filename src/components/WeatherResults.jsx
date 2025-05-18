import React, { useState, useRef, useEffect } from "react";
import Location from "../assets/images/location.svg";
import Tempreature from "../assets/images/temperature.svg";
import Eye from "../assets/images/eye.svg";
import ThermoMini from "../assets/images/temperature-mini.svg";
import Windy from "../assets/images/windy.svg";
import Water from "../assets/images/water.svg";
import { weatherCodesMapping } from "../utils";
import moment from "moment";
import ForecastData from "../ui/ForecastData";
import SunMini from "../assets/images/sun-mini.svg";

export default function WeatherResults({
  forecastLocation,
  dailyForecast,
  currentWeatherData,
  hourlyForecast,
}) {
  console.log(currentWeatherData);

  const weather = currentWeatherData[0]?.value;
  console.log(weather);

  if (!weather) {
    return null;
  }

  return (
    <div
      style={{
        maxWidth: "1085px",
        width: "100%",
        padding: "16px 24px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "-22px",
      }}
    >
      <p className="forecast-title">{weather.weatherCondition}</p>
      <>
        <div className="search-horizontal">
          <div className="weather-left">
            <img
              src={weatherCodesMapping[weather.weatherCode].img}
              alt="Weather Icon"
              className="weather-icon"
            />
            <div className="location-info">
              <img src={Location} alt="Location" />
              <p className="city-name">{forecastLocation?.label}</p>
            </div>
            <p className="text">
              {moment(currentWeatherData[0].date).format("MMMM Do YYYY")}
            </p>
          </div>

          <div className="weather-temp">
            <img
              src={Tempreature}
              alt="Thermometer"
              className="thermometer-img"
            />
            <div className="temp-value">
              <p className="temp">
                {parseFloat(weather.temperature2m).toFixed(0)}
              </p>
              <p className="weather-condition">{weather.weatherCondition}</p>
            </div>
            <p className="temp-unit">°C</p>
          </div>

          <div className="weather-metrics">
            <div className="metric-row">
              <WeatherContent
                image={Eye}
                content="Visibility"
                value={Math.floor(weather.visibility) / 1000}
                unit="km"
              />
              <WeatherContent
                image={SunMini}
                content="Feels Like"
                value={Math.floor(weather.apparentTemperature)}
                unit="°C"
              />
              <WeatherContent
                image={ThermoMini}
                content="Temperature"
                value={Math.floor(weather.temperature2m)}
                unit="°C"
              />
              <WeatherContent
                image={SunMini}
                content="Chance of Rain"
                value={Math.floor(weather.precipitationSum)}
                unit="mm"
              />
            </div>
            <div className="metric-row">
              <WeatherContent
                image={Water}
                content="Humidity"
                value={Math.floor(weather.humidity)}
                unit="%"
              />
              <WeatherContent
                image={Windy}
                content="Wind"
                value={Math.floor(weather.windSpeed)}
                unit="km/hr"
              />
              <WeatherContent
                image={SunMini}
                content="Pressure"
                value={Math.floor(weather.surfacePressure)}
                unit="hpa"
              />
              <WeatherContent
                image={SunMini}
                content="Cloud Cover"
                value={Math.floor(weather.cloudCover)}
                unit="%"
              />
            </div>
          </div>
        </div>
      </>
      <hr />
      <ForecastData
        dailyForecast={dailyForecast}
        hourlyForecast={hourlyForecast}
      />
    </div>
  );
}

function WeatherContent({ image, content, value, unit }) {
  return (
    <>
      <div className="weather-info-subtitle">
        <div className="icon-label">
          <img src={image} alt={image} />
          <p className="weather-params-label">{content}</p>
          <p>
            {value ?? "N/A"} {unit ?? ""}
          </p>
        </div>
      </div>
    </>
  );
}
