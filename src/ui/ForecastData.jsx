import { useRef, useState } from "react";
import DayData from "./DayData";
import HourData from "./HourData";

export default function ForecastData({ hourlyForecast, dailyForecast }) {
  const [display, setDisplay] = useState(false);
  const scrollRef = useRef(null);

  const [scrollLeftBtn, setScrollLeftBtn] = useState(false);
  const [scrollRightBtn, setScrollRightBtn] = useState(true);

  const updateScrollButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    const maxScrollLeft = scrollWidth - clientWidth - 10;

    setScrollLeftBtn(scrollLeft > 0);
    setScrollRightBtn(scrollLeft < maxScrollLeft);

    console.log(scrollLeft, scrollWidth, clientWidth);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -518, behavior: "smooth" });
    }
    setTimeout(updateScrollButtons, 300);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 518, behavior: "smooth" });
    }
    setTimeout(updateScrollButtons, 300);
  };

  return (
    <div style={{ marginTop: "-16px" }}>
      <h1
        style={{ textAlign: "center", color: "#45a29e", marginBottom: "30px" }}
      >
        <span
          onClick={() => {
            setDisplay(false);
            if (scrollRef.current) scrollRef.current.scrollLeft = 0;
            setScrollLeftBtn(false);
            setScrollRightBtn(true);
          }}
          style={{
            cursor: "pointer",
            fontWeight: !display ? "bold" : "normal",
            color: !display ? "#45a29e" : "#ffffff",
          }}
        >
          Hour Forecast
        </span>{" "}
        /{" "}
        <span
          onClick={() => {
            setDisplay(true);
            if (scrollRef.current) scrollRef.current.scrollLeft = 0;
            setScrollLeftBtn(false);
            setScrollRightBtn(true);
          }}
          style={{
            cursor: "pointer",
            fontWeight: display ? "bold" : "normal",
            color: display ? "#45a29e" : "#ffffff",
          }}
        >
          Day Forecast
        </span>
      </h1>

      <div style={{ position: "relative", marginTop: "24px" }} className="btns">
        {!display && (
          <>
            <button
              className={scrollLeftBtn ? "enable" : "disable"}
              id="hour-left-btn"
              onClick={scrollLeft}
              style={{
                position: "absolute",
                left: -50,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "30px",
                padding: "8px",
              }}
            >
              ◀
            </button>
            <button
              className={scrollRightBtn ? "enable" : "disable"}
              id="hour-left-btn"
              onClick={scrollRight}
              style={{
                position: "absolute",
                right: -70,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "30px",
                padding: "8px",
              }}
            >
              ▶
            </button>
          </>
        )}

        <div
          className="class-input"
          id={display ? "res-day" : "res-hour"}
          ref={scrollRef}
          onScroll={updateScrollButtons}
          style={{
            padding: display ? "0" : "0 40px",
            justifyContent: display ? "center" : "flex-start",
            marginLeft: "-30px",
            marginRight: "-30px",
          }}
        >
          {display
            ? Object.keys(dailyForecast).map((day) => (
                <DayData key={day} data={dailyForecast[day]} date={day} />
              ))
            : hourlyForecast.map((elem, elemIndex) => (
                <HourData
                  key={elemIndex}
                  currentTime={elem.isClosestTime}
                  data={elem}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
