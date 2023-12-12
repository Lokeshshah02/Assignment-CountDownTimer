import React, { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import "./counter.scss";
const CountDownTimer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("");

  useEffect(() => {
    let interval;

    const beginCountDown = () => {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (
            prevTime.hours === 0 &&
            prevTime.minutes === 0 &&
            prevTime.seconds === 0
          ) {
            clearInterval(interval);
            setIsRunning(false);
            return prevTime;
          }

          const newHours =
            prevTime.hours === 0
              ? prevTime.hours
              : prevTime.hours - (prevTime.minutes === 0 && prevTime.seconds === 0 ? 1 : 0);
          const newMinutes =
            prevTime.seconds === 0 
            ? prevTime.minutes -1
            : prevTime.minutes;
            //  - (prevTime.hours === 0 && prevTime.minutes === 0 ? 1 : 0);

          const newSeconds = prevTime.seconds === 0 ? 59 : prevTime.seconds - 1;

          return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    };

    if (isRunning) {
      beginCountDown();
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTime({ hours: 0, minutes: 0, seconds: 0 });
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputMinutes = Math.max(parseInt(inputValue, 10), 0) || 0;
    setInputMinutes(inputMinutes);

    const newHours = Math.floor(inputMinutes / 60);
    const newMinutes = inputMinutes % 60;
    console.log("minute", newMinutes);

    setTime({ hours: newHours, minutes: newMinutes, seconds: 0 });
    setIsRunning(false);
  };

  return (
    <div className="main">
      <div className="container">
        <div className="input-container">
          <label>Enter Minutes </label>
          <input
            type="number"
            value={inputMinutes}
            onChange={handleChange}
            disabled={isRunning}
            style={{ outline: "none" }}
          />
          <div>
            <p>
              <FaCirclePlay
                style={{ fontSize: "40px" }}
                onClick={handleStart}
              />
              {String(time.hours).padStart(2, "0")} :{" "}
              {String(time.minutes).padStart(2, "0")} :{" "}
              {String(time.seconds).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;
