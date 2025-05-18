import moment from "moment";

import { weatherCodesMapping } from "../utils";
export default function DayData({ data, date }) {
  return (
    <>
      <div className="day-input">
        <div className="day-forecast-container">
          <p>{moment(date).format("dddd")}</p>
          <p className="text" style={{ fontSize: "12px" }}>
            {moment(date).format("MMM DD")}
          </p>
          <img
            src={weatherCodesMapping[data.weatherCode].img}
            alt="weather"
            width={48}
            height={48}
          />
          <p>{data.weatherCondition}</p>
          <p className="temp-range">
            {Math.floor(data.temperature2mMin)}℃ -{" "}
            {Math.floor(data.temperature2mMax)}℃
          </p>
        </div>
      </div>
    </>
  );
}
