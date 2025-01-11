import React, { useState, useRef } from "react";

const TimerBlues = ({ isVisible, onClose, countdownTime1, nextSong }) => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const timerRef = useRef(null);

    const skipSong = () => {
        console.log("Pulando a música...");
        nextSong();
        // Lógica para pular a música, isso depende de como você controla a música.
        // Suponha que você tenha uma função `nextSong` no seu MusicPlayer.
    };

    const startTimer = () => {
        console.log("Timer iniciado");

        // Inicia o primeiro setTimeout
        timerRef.current = setTimeout(() => {
            skipSong();
            setIsTimerActive(false); // Pula a música ao atingir o tempo
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

export default TimerBlues;