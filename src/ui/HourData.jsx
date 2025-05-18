import ArrowLeft from "../assets/images/arrow-left.svg";
import ArrowRight from "../assets/images/arrow-right.svg";
import ArrowStraight from "../assets/images/arrow-straight.svg";
import moment from "moment";
import { weatherCodesMapping } from "../utils";

export default function HourData({ currentTime, data }) {
  const windDirection = Math.floor(data?.value?.windDirection10m);
  const windIcon =
    windDirection < 90 || windDirection > 270
      ? ArrowRight
      : windDirection > 90 && windDirection < 270
      ? ArrowLeft
      : ArrowStraight;

  return (
    <>
      <div style={{ width: "100px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "1px",
            height: "246px",
            marginLeft: "50%",
            transform: "translateX(-50%)",
            width: "120px",
            fontSize: "small",
          }}
          className={`${currentTime ? "time-highlight" : ""}`}
        >
          <p>{currentTime ? "Now" : moment(data.date).format("HH:mm")}</p>
          <img
            src={weatherCodesMapping[data?.value?.weatherCode].img}
            width={48}
            height={48}
            alt="Weather Icon"
          />
          <p>{Math.floor(data?.value?.temperature2m)}°C</p>
          <img src={windIcon} alt="Wind Direction" />
          <p>{Math.floor(data?.value?.windSpeed)} km/hr</p>
        </div>
      </div>
    </>
  );
}
