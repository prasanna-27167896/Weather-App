import React, { useEffect, useState } from "react";
import Tempreature from "../assets/images/temperature.svg";
import Eye from "../assets/images/eye.svg";
import ThermoMini from "../assets/images/temperature-mini.svg";
import Windy from "../assets/images/windy.svg";
import Water from "../assets/images/water.svg";
import DefaultCards from "./DefaultCards";

import { weatherCodesMapping } from "../utils";
import moment from "moment";
import SearchInput from "../ui/SearchInput";

export default function DefaultScreen({
  currentWeatherData,
  forecastLocation,
  onClickHandler,
}) {
  return (
    <>
      <SearchInput onClickHandler={onClickHandler} />
      <div className="default-container">
        <>
          {currentWeatherData?.length && currentWeatherData[0] && (
            <>
              <div className="default-city ">
                <img
                  src={
                    weatherCodesMapping[
                      currentWeatherData[0]?.value?.weatherCode
                    ].img
                  }
                  style={{ marginLeft: "90px", width: "50px" }}
                  alt="City"
                />
                <div className="default-content" style={{ marginLeft: "-5px" }}>
                  <p className="city-name">{forecastLocation?.label}</p>
                  <p className="date">{moment().format("dddd DD/MM/YYYY")}</p>
                </div>
              </div>
              <div className="temp-container">
                <img
                  src={Tempreature} // Add weather icon path here
                  style={{ height: "70px" }}
                  className="weather-icon"
                />
                <div style={{ marginTop: "22px" }}>
                  <p className="temperature">
                    {parseFloat(
                      currentWeatherData[0].value.temperature2m
                    ).toFixed(0)}
                  </p>
                  <div style={{ marginTop: "20px" }}>
                    <p className="temperature-description">
                      {currentWeatherData[0].value.weatherCondition}
                    </p>
                  </div>
                </div>
                <p className="temperature-unit">℃</p>
              </div>
              <div className="cards-container">
                <DefaultCards
                  img={Eye}
                  content="Visibility"
                  unit="km"
                  value={(
                    Math.floor(currentWeatherData[0].value?.visibility) / 1000
                  ).toFixed(0)}
                />
                <DefaultCards
                  img={ThermoMini}
                  content="Feels Like"
                  unit="℃"
                  value={Math.floor(
                    currentWeatherData[0].value?.apparentTemperature
                  )}
                />
                <DefaultCards
                  img={Water}
                  content="Humidity"
                  unit="%"
                  value={Math.floor(currentWeatherData[0].value?.humidity)}
                />
                <DefaultCards
                  img={Windy}
                  content="Wind"
                  unit="km/h"
                  value={Math.floor(currentWeatherData[0].value?.windSpeed)}
                />
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
}
