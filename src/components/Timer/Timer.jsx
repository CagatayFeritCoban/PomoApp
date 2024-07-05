import React, { useEffect, useState } from "react";
import "./Timer.css";

function Timer() {
  const [breakTime, setBreakTime] = useState(3);
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isShortBreak, setIsShortBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [buttonText, setButtonText] = useState("Start");

  useEffect(() => {
    let countdown;
    if (isActive) {
      countdown = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(countdown);
            setButtonText("Restart");
            if (isPomodoro) {
              setBreakTime((prevBreakTime) => prevBreakTime + 1);
              if (breakTime === 4) {
                longBreak();
                setBreakTime(0);
              } else {
                shortBreak();
              }
            } else if (isShortBreak) {
              pomodoro();
            } else if (isLongBreak) {
              pomodoro();
            }
            return 0;
          }
        });
      }, 1);
    }

    return () => clearInterval(countdown);
  }, [isActive, isPomodoro, breakTime]);


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setButtonText("Stop");
    } else {
      setButtonText("Start");
    }
  };

  const shortBreak = () => {
    document.body.style.backgroundColor = "#89ABE3";
    setTime(5 * 60);
    setIsShortBreak(true);
    setIsLongBreak(false);
    setIsPomodoro(false);
    setIsActive(false);
    setButtonText("Start");
  };

  const pomodoro = () => {
    document.body.style.backgroundColor = "#BA4949";
    setTime(25 * 60);
    setIsShortBreak(false);
    setIsLongBreak(false);
    setIsPomodoro(true);
    setIsActive(false);
    setButtonText("Start");
  };

  const longBreak = () => {
    document.body.style.backgroundColor = "#6AB187";
    setTime(20 * 60);
    setIsActive(false);
    setIsShortBreak(false);
    setIsPomodoro(false);
    setIsLongBreak(true);
    setButtonText("Start");
  };

  
  return (
    <div className="content">
      <div className="timerDisplay">
        <div className="timerHeader">
          <div className="pomodoro">
            <button onClick={pomodoro}>Pomodoro</button>
          </div>
          <div className="shortBreak">
            <button onClick={shortBreak}>Short Break</button>
          </div>
          <div className="longBreak">
            <button onClick={longBreak}>Long Break</button>
          </div>
        </div>
        <div className="timer">{formatTime(time)}</div>
        <div className="start">
          <button className="startButton" onClick={toggleTimer}>
            {buttonText}
          </button>
        </div>
        <div className="breakTime">
          <p>Break Time Count: {breakTime}</p>
        </div>
      </div>
    </div>
  );
}

export default Timer;
