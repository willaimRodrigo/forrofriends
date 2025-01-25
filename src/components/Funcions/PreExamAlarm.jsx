import { useState, useRef, useEffect } from "react";

export const PreExameAlarm = ({
    audioRef,       // Referência do áudio principal
    playAudio,
    pauseAudio,     // Função para pausar o áudio
}) => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [alertCount, setAlertCount] = useState(1); // Número de alertas configurados
    const [inputAlertCount, setInputAlertCount] = useState(""); // Input para configurar alertas
    const [inputTime, setInputTime] = useState(""); // Tempo configurado pelo usuário
    const [timeBetweenAlerts, setTimeBetweenAlerts] = useState(4000); // Tempo entre alertas (padrão)
    const timerRef = useRef(null);

    const playAlertSound = () => {
        const alertAudio = new Audio("/audio/agradeceu e trocou.mp3");
        alertAudio.play()
            .then(() => console.log("Alerta tocando..."))
            .catch((err) => console.error("Erro ao reproduzir o alerta:", err));
    };

    const reduceVolume = () => {
        if (!audioRef.current) return;

        let volume = audioRef.current.volume;
        const interval = setInterval(() => {
            if (volume > 0.1) {
                volume -= 0.05;
                audioRef.current.volume = Math.max(volume, 0);
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
                volume += 0.05;
                audioRef.current.volume = Math.min(volume, 1);
            } else {
                clearInterval(interval);
                console.log("Volume restaurado ao máximo.");
            }
        }, 300);
    };

    const startAlarmSequence = () => {
        if (!audioRef.current) {
            console.error("Referência de áudio inválida.");
            return;
        }

        console.log("Iniciando sequência de alertas...");

        let currentAlert = 0;

        const alertInterval = setInterval(() => {
            if (currentAlert < alertCount) {
                playAlertSound();
                currentAlert++;
            } else {
                clearInterval(alertInterval);
                console.log("Sequência de alertas concluída. Reduzindo volume e pausando música...");
                reduceVolume();

                setTimeout(() => {
                    pauseAudio();
                    restoreVolume();
                }, 3000); // Pausa após reduzir o volume
            }
        }, timeBetweenAlerts);
    };

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
                    // if (onTimerEnd) onTimerEnd();
                    return inputTime; // Reinicia o timer com o valor do input
                }
                return prev - 1; // Decrementa o tempo restante
            });
        }, 1000); // Intervalo de 1 segundo
    };

    const stopTimer = () => {
        console.log("Timer parado.");
        clearTimeout(timerRef.current);
        setIsTimerActive(false);
    };

    const handleAlertCountChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setInputAlertCount(value || ""); // Permite limpar o input
    };

    const handleSetAlertCount = () => {
        const count = parseInt(inputAlertCount, 10);
        if (!isNaN(count) && count > 0) {
            setAlertCount(count);
            console.log(`Número de alertas configurado para: ${count}`);
        } else {
            alert("Por favor, insira um número válido de alertas!");
        }
    };

    const handleTimeChange = (e) => {
        const value = e.target.value;
        setInputTime(value === "" ? "" : parseInt(value, 10)); // Permite limpar o input
    };

    useEffect(() => {
        return () => {
            stopTimer(); // Limpa o timer ao desmontar o componente
        };
    }, []);

    return (
        <div className="alert-timer-container">
            <h2>Alerta de Pré-Exame</h2>

            {/* Input para configurar número de alertas */}
            <label>
                Número de Alertas:
                <input
                    type="number"
                    min="1"
                    value={inputAlertCount}
                    placeholder="Digite o número de alertas"
                    onChange={handleAlertCountChange}
                    disabled={isTimerActive}
                />
            </label>
            <button onClick={handleSetAlertCount} disabled={isTimerActive}>
                Configurar Alertas
            </button>

            {/* Input para configurar tempo inicial */}
            <label>
                Tempo Inicial (segundos):
                <input
                    type="number"
                    min="1"
                    value={inputTime}
                    placeholder="Digite o tempo aqui!"
                    onChange={handleTimeChange}
                    disabled={isTimerActive}
                />
            </label>

            {/* Botão de controle do Timer */}
            <button onClick={isTimerActive ? stopTimer : startTimer}>
                {isTimerActive ? "Parar Timer" : "Iniciar Timer"}
            </button>
        </div>
    );
};
