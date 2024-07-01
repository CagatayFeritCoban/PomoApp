import React from "react";
import { useEffect, useState } from "react";
import "./Timer.css";
function Timer() {
  const [time, setTime] = useState(25 * 60); // 25 dakika
  const [isActive, setIsActive] = useState(false); // Başlangıçta geri sayım aktif değil
  const [isShortBreak, setIsShortBreak] = useState(false); // Kısa mola durumu
  const [buttonText, setButtonText] = useState("Start"); // Başlangıçta buton metni "Start"

  useEffect(() => {
    let countdown;
    if (isActive) {
      countdown = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(countdown);
            setButtonText("Restart"); // Süre bittiğinde buton metnini "Restart" olarak değiştir
            return 0;
          }
        });
      }, 1);
    }

    return () => clearInterval(countdown); // Cleanup fonksiyonu
  }, [isActive]); // isActive değiştiğinde çalışır

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = isShortBreak
      ? minutes
      : (minutes < 10 ? "0" : "") + minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive); // Geri sayımı başlat/durdur
    if (!isActive) {
      setButtonText("Stop"); // Başlatıldığında buton metnini "Stop" olarak değiştir
    } else {
      setButtonText("Start"); // Durdurulduğunda buton metnini "Restart" olarak değiştir
    }
  };

  const shortBreak = () => {
    document.body.style.backgroundColor = "#89ABE3";
    setTime(5 * 60); // Set time to 5 minutes
    setIsShortBreak(true); // Kısa mola durumunu ayarla
  };
  const pomodoro = () => {
    document.body.style.backgroundColor = "#BA4949";
    setTime(25 * 60); // Set time to 5 minutes
    setIsShortBreak(false); // Kısa mola durumunu ayarla
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
            <button>Long Break</button>
          </div>
        </div>
        <div className="timer">{formatTime(time)}</div>
        <div className="start">
          <button className="startButton" onClick={toggleTimer}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
