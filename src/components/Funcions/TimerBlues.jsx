import React, { useState, useRef, useEffect } from "react";

const TimerBlues = ({
    isVisible,
    countdownTime1,
    nextSong,
    playAudio,
    pauseAudio,
    audioRef
}) => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const timerRef = useRef(null);

    const reduceVolume = () => {
        if (!audioRef.current) return;

        let volume = audioRef.current.volume;
        const interval = setInterval(() => {
            if (volume > 0.1) {
                volume -= 0.05; // Diminui gradualmente o volume
                audioRef.current.volume = Math.max(volume, 0); // Impede volume abaixo de 0
                console.log("Reduzindo volume...");
            } else {
                clearInterval(interval);
                console.log("Volume reduzido ao mínimo.");
            }
        }, 100);
    };

    const restoreVolume = () => {
        if (!audioRef.current) return;

        let volume = audioRef.current.volume;
        const interval = setInterval(() => {
            if (volume < 1) {
                volume += 0.05; // Aumenta gradualmente o volume
                audioRef.current.volume = Math.min(volume, 1); // Impede volume acima de 1
                console.log("Restaurando volume...");
            } else {
                clearInterval(interval);
                console.log("Volume restaurado ao máximo.");
            }
        }, 300);
    };

    const startTimer = () => {
        console.log("Timer iniciado");
        playAudio();

        // Reduz o volume após o tempo inicial
        timerRef.current = setTimeout(() => {
            reduceVolume();

            // Após reduzir o volume, pausa o áudio
            timerRef.current = setTimeout(() => {
                pauseAudio();
                console.log("Áudio pausado.");

                // Após pausar o áudio, restaura o volume
                timerRef.current = setTimeout(() => {
                    restoreVolume();

                    // Após restaurar o volume, pula para a próxima música
                    timerRef.current = setTimeout(() => {
                        nextSong();
                        console.log("Próxima música.");
                        stopTimer();
                        pauseAudio();
                    }, 5000); // Tempo para próxima música
                }, 4000); // Tempo para restaurar volume
            }, 2000); // Tempo para pausar áudio
        }, 86000); // Tempo inicial do timer
    };

    const stopTimer = () => {
        console.log("Timer parado.");
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

    useEffect(() => {
        return () => {
            stopTimer(); // Limpa o timer ao desmontar o componente
        };
    }, []);

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
