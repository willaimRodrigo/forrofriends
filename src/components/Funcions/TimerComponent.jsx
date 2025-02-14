import { useState, useEffect, useRef } from "react";

export default function TimerComponent({ onTimerEnd, playAudio }) {
    const [timeRemaining, setTimeRemaining] = useState(); // Tempo restante em segundos
    const [isActive, setIsActive] = useState(false); // Estado do timer
    const [inputTime, setInputTime] = useState(); // Tempo inicial padrão (30 segundos)
    const alertSound = useRef(null);
    const timerInterval = useRef(null);

    useEffect(() => {
        // Carrega o áudio no início
        alertSound.current = new Audio("/audio/agradeceu e trocou.mp3");
        alertSound.current.loop = false; // Não precisa de loop; será controlado manualmente
        alertSound.current.onerror = () => {
            console.error("Erro ao carregar o som de alerta. Verifique o caminho ou formato do arquivo.");
        };

        return () => {
            clearInterval(timerInterval.current); // Limpa o intervalo ao desmontar o componente
        };
    }, []);

    const startTimer = () => {
        if (inputTime <= 0) {
            console.log("Configure um tempo válido antes de iniciar o timer.");
            return;
        }
        playAudio();

        setTimeRemaining(inputTime);
        setIsActive(true);

        timerInterval.current = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    playAlertSound(); // Reproduz o som de alerta
                    if (onTimerEnd) onTimerEnd();
                    return inputTime; // Reinicia o timer com o valor do input
                }
                return prev - 1; // Decrementa o tempo restante
            });
        }, 1000); // Intervalo de 1 segundo
    };

    const stopTimer = () => {
        setIsActive(false);
        clearInterval(timerInterval.current);
    };

    const resetTimer = () => {
        stopTimer();
        setTimeRemaining(inputTime); // Redefine para o valor do input
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        if (value === "") {
            setInputTime("");
            if (!isActive) setTimeRemaining("");
            return;
        }

        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue >= 0) {
            setInputTime(parsedValue);
            if (!isActive) setTimeRemaining(parsedValue); // Atualiza o tempo restante se o timer não estiver ativo
        }
    };

    const playAlertSound = () => {
        if (alertSound.current) {
            alertSound.current.currentTime = 0;
            alertSound.current.play().catch((err) =>
                console.error("Erro ao tentar tocar o som de alerta:", err)
            );
        }
    };

    return (
        <div>
            <h4>Timer</h4>
            <input
                type="number"
                min="0"
                value={inputTime === undefined ? "" : inputTime} // Valor padrão do input
                placeholder="Digite o tempo aqui!"
                onChange={handleInputChange}
                disabled={isActive}
            />
            <p>Tempo Restante: {timeRemaining}s</p>
            <button onClick={isActive ? stopTimer : startTimer}>
                {isActive ? "Parar" : "Iniciar"}
            </button>
            <button onClick={resetTimer}>Resetar</button>
        </div>
    );
}
