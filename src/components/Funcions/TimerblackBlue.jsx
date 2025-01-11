import React, { useState, useRef, useEffect } from "react";

const TimerBlackBlue = ({ isVisible, onClose, countdownTime1, nextSong, pauseAudio, audioRef }) => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const timerRef = useRef(null);

    const reduceVolume = () => {
        if (!audioRef.current) return;

        let volume = audioRef.current.volume;
        const interval = setInterval(() => {
            if (volume > 0.5) {
                volume -= 0.05; // Diminui gradualmente o volume
                audioRef.current.volume = Math.max(volume, 0); // Impede volume abaixo de 0
                console.log("reduzindo")
            } else {
                clearInterval(interval);
            }
        }, 1000);
    };

    const restoreVolume = () => {
        if (!audioRef.current) return;

        let volume = audioRef.current.volume;
        const interval = setInterval(() => {
            if (volume < 1) {
                volume += 0.05; // Aumenta gradualmente o volume
                audioRef.current.volume = Math.min(volume, 1); // Impede volume acima de 1
            } else {
                clearInterval(interval);
            }
        }, 1000);
    };

    const startTimer = () => {
        console.log("Timer iniciado");

        // Inicia o primeiro setTimeout
        timerRef.current = setTimeout(() => {
            reduceVolume();
            // pauseAudio();
            // setIsTimerActive(false); // Pula a música ao atingir o tempo

            timerRef.current = setTimeout(() => {
                pauseAudio();
                restoreVolume();
                
                timerRef.current = setTimeout(() => {
                    nextSong();
                }, 5000)
            }, 1000)
        }, countdownTime1);
    };

    const stopTimer = () => {
        console.log("Timer parado");
        clearTimeout(timerRef.current);
        setIsTimerActive(false);
    };

    const toggleTimer = () => {
        if (isTimerActive) {
            stopTimer();
        } else {
            setIsTimerActive(true);
            startTimer();
        }
    };

    if (!isVisible) return null;

    return (
        <div className="alert-timer-container">
            <h2>Alerta de Timer</h2>
            <button onClick={toggleTimer}>
                {isTimerActive ? "Parar Timer" : "Iniciar Timer"}
            </button>
        </div>
    );
};

export default TimerBlackBlue;
