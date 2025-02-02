import { useState, useRef } from "react";

export const PreExameAlarm = ({ audioRef, playAudio, pauseAudio }) => {
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [inputTime, setInputTime] = useState(""); // Tempo total configurado pelo usuário
    const [inputAlertCount, setInputAlertCount] = useState(""); // Número de alertas
    const alertIntervalRef = useRef(null); // Ref para armazenar o setInterval
    const totalTimerRef = useRef(null); // Ref para armazenar o setTimeout

    // Função para tocar o alerta
    const playAlertSound = () => {
        const alertAudio = new Audio("/audio/agradeceu e trocou.mp3");
        alertAudio.play().catch((err) => console.error("Erro ao reproduzir o alerta:", err));
    };

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

    const reduceAndPause = () => {
        console.log("aqui a função")
        setTimeout(() => {
            console.log("aqui o reduce")
            reduceVolume();

            setTimeout(() => {
                pauseAudio();
                console.log("chegou aqui")
                restoreVolume();
                setIsTimerActive(false);
            }, 3000)
        }, 1000)
    }

    const alertReduceAndeRestore = () => {
        reduceVolume();

        setTimeout(() => {
            playAlertSound();

            setTimeout(() => {
                restoreVolume();
            }, 1500)
        }, 2000)
    }

    // Iniciar o timer
    const startTimer = () => {
        const totalTime = inputTime * inputAlertCount; // Tempo total em milissegundos
        const alertIntervalTime = inputAlertCount * 1000; // Tempo entre os alertas em milissegundos (20 segundos)

        console.log(`Iniciando o timer com ${totalTime / 1000} segundos.`);
        setIsTimerActive(true); // Marca o timer como ativo
        setTimeRemaining(totalTime);

        playAudio();

        // Iniciar o intervalo de alertas (a cada 20 segundos)
        alertIntervalRef.current = setInterval(() => {
            alertReduceAndeRestore();// Chama a função para tocar o alerta
            console.log("Alerta tocado!");
        }, alertIntervalTime);

        // Iniciar o contador do tempo total
        totalTimerRef.current = setTimeout(() => {
            clearInterval(alertIntervalRef.current); // Para os alertas quando o tempo total acabar
            reduceAndPause();
            console.log("Tempo total finalizado.");
            
        }, totalTime * 1000);

        const countdown = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown); // Para o contador quando o tempo acabar
                    return 0;
                }
                return prev - 1; // Decrementa o tempo restante
            });
        }, 1000);
    };

    const stopTimer = () => {
        console.log("Timer parado.");
        clearTimeout(totalTimerRef.current);
        clearInterval(alertIntervalRef.current);
        setIsTimerActive(false);
        pauseAudio();
    };

    // Alterar o tempo total
    const handleTimeChange = (e) => {
        const value = e.target.value;
        setInputTime(value === "" ? "" : parseInt(value, 10));
         // Permite limpar o input
    };

    // Alterar o número de alertas (não estamos utilizando diretamente, mas pode ser útil para futuras implementações)
    const handleAlertCountChange = (e) => {
        setInputAlertCount(e.target.value);
    };

    return (
        <div>
            <h2>Alerta de Pré-Exame</h2>
            <label>
                Examinadores:
                <input style={{ border: "1px solid black", marginTop: "10px" }}
                    type="number"
                    min="1"
                    value={inputTime}
                    placeholder="Quantos examinadores há?"
                    onChange={handleTimeChange}
                    disabled={isTimerActive}
                />
            </label>
            <label>
                Tempo com examinador (segundos):
                <input style={{ border: "1px solid black", marginTop: "10px" }}
                    type="number"
                    min="1"
                    value={inputAlertCount}
                    placeholder="Digite o tempo em segundos"
                    onChange={handleAlertCountChange}
                    disabled={isTimerActive}
                />
            </label>
            <p>Tempo Total Restante: {timeRemaining}</p>
            <button onClick={isTimerActive ? stopTimer : startTimer}>
                {isTimerActive ? "Parar Timer" : "Iniciar Timer"}
            </button>
        </div>
    );
};
