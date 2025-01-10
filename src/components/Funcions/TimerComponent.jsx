import { useState, useRef, useEffect } from "react";

export default function TimerComponent() {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timerDuration, setTimerDuration] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    const alertSoundUrl = "/audio/agradeceu e trocou-girl.mp3"; // Caminho para o arquivo de áudio

    const alertSound = useRef(null);

    // Função para iniciar o som de alerta
    const startAudio = () => {
        if (alertSound.current) {
            alertSound.current.currentTime = 0;  // Reseta o tempo de reprodução
            alertSound.current.play().catch((error) => {
                console.log("Erro ao tentar tocar o áudio:", error);
            });
        }
    };

    // Função para diminuir o volume gradualmente
    const reduceVolume = (audio) => {
        let volume = audio.volume;
        const interval = setInterval(() => {
            if (volume > 0) {
                volume -= 0.05;  // Reduz o volume gradualmente
                audio.volume = Math.max(volume, 0);  // Garante que o volume não fique abaixo de 0
            } else {
                clearInterval(interval);  // Para de diminuir o volume quando atingir zero
            }
        }, 100);
    };

    // Função para aumentar o volume gradualmente
    const restoreVolume = (audio) => {
        let volume = audio.volume;
        const interval = setInterval(() => {
            if (volume < 1) {
                volume += 0.05;  // Aumenta o volume gradualmente
                audio.volume = Math.min(volume, 1);  // Garante que o volume não ultrapasse 1
            } else {
                clearInterval(interval);  // Para de aumentar o volume quando atingir o máximo
            }
        }, 100);
    };



    // Função para iniciar o timer
    const startTimer = () => {
        const minutesInput = document.querySelector('.minutesInput').value || 0;
        const secondsInput = document.querySelector('.secondsInput').value || 0;
        const countdownTime = (parseInt(minutesInput) * 60 + parseInt(secondsInput)) * 1000;

        if (isNaN(countdownTime) || countdownTime <= 0) {
            console.log("Tempo inválido");
            return;
        }

        setTimerDuration(countdownTime);

        // Inicia o intervalo que vai tocar o áudio quando o timer completar
        const interval = setInterval(() => {
            startAudio();  // Toca o som
            console.log("alert init");

            // Aumenta o volume quando o timer termina
            restoreVolume(alertSound.current);

            // Para o timer após a execução
            clearInterval(interval);
            setIntervalId(null);
        }, countdownTime);

        setIntervalId(interval);
        console.log("Timer iniciado com duração:", countdownTime, "milissegundos.");

        // Diminui o volume do áudio enquanto o timer está em execução
        reduceVolume(alertSound.current);
    };

    // Função para parar o timer
    const stopTimer = () => {
        if (intervalId) {
            clearTimeout(intervalId);  // Limpa o setTimeout
            setIntervalId(null);
            console.log("Timer parado.");
        }
    };

    // Alterna entre iniciar e parar o timer
    const toggleTimer = () => {
        if (isTimerActive) {
            stopTimer();
        } else {
            startTimer();
        }
        setIsTimerActive(!isTimerActive);
    };

    // Usando ref para carregar o áudio
    useEffect(() => {
        alertSound.current = new Audio(alertSoundUrl);
        alertSound.current.volume = 1;  // Inicializa com volume máximo
    }, []);

    return (
        <div>
            <input type="number" className="minutesInput" placeholder="Minutos" />
            <input type="number" className="secondsInput" placeholder="Segundos" />
            <button className="toggle__timer" onClick={toggleTimer}>
                {isTimerActive ? "Stop" : "Start"}
            </button>
        </div>
    );
}

