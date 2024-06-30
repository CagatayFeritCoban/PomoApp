import React from "react";
import "./Timer.css"
function Timer() {
  return (
    <div className="Timer">
      <div className="timerDisplay">
        <div className="timerHeader">
          <div className="pomodoro"><button>Pomodoro</button></div>
          <div className="shortBreak"><button>Short Break</button></div>
          <div className="longBreak"><button>Long Break</button></div>
        </div>
        <div className="timer">25:00</div>
        <div className="start"><button>Start</button></div>
      </div>
    </div>
  );
}

export default Timer;
