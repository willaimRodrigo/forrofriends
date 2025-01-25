import React, { useState, useRef, useEffect } from "react";

const TimerBlackBlue = ({ 
    isVisible,
      countdownTime1,
      countdownTime2,
       nextSong,
        pauseAudio,
        playAudio,
         audioRef,
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
                console.log("reduzindo")
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
            } else {
                clearInterval(interval);
                console.log("volume restaurado ao maximo")
            }
        }, 300);
    };

    const AlertExameAudio = () => {
        const alertAudioPath = "/audio/agradeceu e trocou.mp3";

        if (!audioRef?.current) {
            console.error("Audio reference is not valid.");
            return;
        }

        const musicAudio = audioRef.current; // Referência do áudio principal
        const alertAudio = new Audio(alertAudioPath); // Áudio de alerta

        // Tocar o áudio principal por 90 segundos
        musicAudio.play();
        console.log("Música iniciada. Tocando por 90 segundos...");

        // Após 90 segundos, parar a música principal e tocar o som de alerta
        setTimeout(() => {
            console.log("90 segundos concluídos. Parando música e tocando som de alerta...");

            reduceVolume();

            setTimeout(() => {
                alertAudio.play();
                restoreVolume();
            }, 2000)
             // Toca o som "agradeceu e trocou"
        }, 69000); // 90 segundos
    };

    const reduceAndPause = () => {
        setTimeout(() => {
            reduceVolume();

            setTimeout(() => {
                pauseAudio();
                console.log("chegou aqui")
                restoreVolume();
            }, 3000)
        }, 1000)
    }

    const TimerForTimeOut = () => {
        setTimeout(() => {
            AlertExameAudio();
            console.log("aqui chamou o Alert")

            setTimeout(() => {
                reduceVolume();
                
                setTimeout(() => {
                    reduceAndPause();
                    restoreVolume();
                    stopTimer();
                }, 74000)
            }, 69000)
        }, 4000)
    }

    const startTimer = () => {
        console.log("Timer iniciado");
        playAudio();
        // Inicia o primeiro setTimeout
        timerRef.current = setTimeout(() => {
            reduceAndPause();

            timerRef.current = setTimeout(() => {
                
                console.log("restaura volume")
                
                timerRef.current = setTimeout(() => {
                    console.log("pula musica")
                    nextSong();
                    TimerForTimeOut();
                }, countdownTime2)
            }, 8000)
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

    useEffect(() => {
        return () => {
            stopTimer(); // Limpa o timer ao desmontar o componente
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="alert-timer-container">
            <h2>Alerta de Timer</h2>
            <button onClick={toggleTimer} >
                {isTimerActive ? "Parar Timer" : "Iniciar Timer"}
                
            </button>
        </div>
    );
};

export default TimerBlackBlue;
