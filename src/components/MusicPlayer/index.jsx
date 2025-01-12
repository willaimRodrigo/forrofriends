import { useState, useRef, useEffect } from "react";
import { shuffleArray } from "../Funcions/functions";
import TimerComponent from "../Funcions/TimerComponent";
import TimerBlackBlue from "../Funcions/TimerblackBlue";

const reduceVolume = (audio) => {
    if (!audio) return;
    let volume = audio.volume;
    const interval = setInterval(() => {
        if (volume > 0.2) {
            volume -= 0.05; // Reduz gradualmente
            audio.volume = Math.max(volume, 0); // Garante que não vá abaixo de 0
        } else {
            clearInterval(interval);
        }
    }, 100);
};

const restoreVolume = (audio) => {
    if (!audio) return;
    let volume = audio.volume;
    const interval = setInterval(() => {
        if (volume < 1) {
            volume += 0.05; // Aumenta gradualmente
            audio.volume = Math.min(volume, 1); // Garante que não ultrapasse 1
        } else {
            clearInterval(interval);
        }
    }, 100);
};

export default function MusicPlayer({ album, countdownTime1, countdownTime2 }) {
    const audioRef = useRef(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playlist, setPlaylist] = useState(album);
    const [originalPlaylist, setOriginalPlaylist] = useState([]);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isTimerVisible, setIsTimerVisible] = useState(false);
    const [isTraingVisible, setIsTrainingVisible] = useState(false);

    // Salva no cache quando a playlist mudar
    useEffect(() => {
        if (album && album.length > 0) {
            localStorage.setItem("currentPlaylist", JSON.stringify(album));
            console.log("Playlist salva no cache.");
        }
    }, [album]);

    useEffect(() => {
        const cachedPlaylist = localStorage.getItem("currentPlaylist");
        if (cachedPlaylist) {
            const parsedPlaylist = JSON.parse(cachedPlaylist);
            setPlaylist(parsedPlaylist);
            setOriginalPlaylist(parsedPlaylist);
            setCurrentSongIndex(0);

            if (parsedPlaylist.length > 0) {
                audioRef.current.src = parsedPlaylist[0].src;
            }

            console.log("Playlist carregada do cache.");
        } else if (album) {
            setPlaylist(album);
            setOriginalPlaylist(album);
            setCurrentSongIndex(0);

            if (album.length > 0) {
                audioRef.current.src = album[0].src;
            }

            console.log("Playlist carregada do álbum.");
        }
    }, [album]);


    const playAudio = () => {
        audioRef.current.play();
    };

    const pauseAudio = () => {
        audioRef.current.pause();
    };

    const nextSong = () => {
        let nextIndex = (currentSongIndex + 1) % playlist.length;
        setCurrentSongIndex(nextIndex);
        audioRef.current.src = playlist[nextIndex].src;
        audioRef.current.play();
    };

    const prevSong = () => {
        let prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        setCurrentSongIndex(prevIndex);
        audioRef.current.src = playlist[prevIndex].src;
        audioRef.current.play();
    };

    const restartSong = () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    };

    const toggleShuffle = () => {
        if (isShuffled) {
            setPlaylist(originalPlaylist);
            setCurrentSongIndex(0);
        } else {
            const shuffled = shuffleArray([...playlist]);
            setPlaylist(shuffled);
            setCurrentSongIndex(0);
            audioRef.current.src = shuffled[0].src;
        }
        setIsShuffled(!isShuffled);
        audioRef.current.play();
    };

    const handleTimerEnd = () => {
        console.log("Timer terminou! Reduzindo o volume...");
        reduceVolume(audioRef.current);

        // Restaura o volume após 4 segundos
        setTimeout(() => {
            console.log("Restaurando o volume...");
            restoreVolume(audioRef.current);
        }, 5000);
    };

    const toggleTimerVisibility = () => {
        setIsTimerVisible(!isTimerVisible); // Alterna a visibilidade do temporizador
    };

    const toggleTrainingVisibility = () => {
        setIsTrainingVisible(!isTraingVisible); // Alterna a visibilidade do temporizador
    };

    return (
        <>
            <h2>Controle de Reprodução</h2>
            <audio ref={audioRef} controls onEnded={nextSong}>
                <source src={playlist[currentSongIndex].src} type="audio/mp3" />
            </audio>
            <button onClick={prevSong}>Anterior</button>
            <button onClick={playAudio}>Play</button>
            <button onClick={pauseAudio}>Pause</button>
            <button onClick={nextSong}>Próxima</button>
            <button onClick={restartSong}>Refresh</button>
            <button onClick={toggleShuffle}>
                {isShuffled ? "Desativar Aleatório" : "Reprodução Aleatória"}
            </button>
            <h3>Tocando: {playlist[currentSongIndex].name}</h3>
            <button onClick={toggleTimerVisibility}>
                {isTimerVisible ? "Fechar Timer" : "Abrir Timer"}
            </button>
            {isTimerVisible && (
                <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
                    <button onClick={toggleTimerVisibility} style={{ float: "right" }}>
                        X
                    </button>
                    <TimerComponent
                        onTimerEnd={handleTimerEnd}
                        isActive={isTimerActive}
                    />
                </div>
            )}

            <button onClick={toggleTrainingVisibility}>
                {isTraingVisible ? "Fechar Treino" : "Abrir Treino"}
            </button>
            {isTraingVisible && (
                <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
                    
                    <button onClick={toggleTrainingVisibility} style={{ float: "right" }}>
                        X
                    </button>
                    <TimerBlackBlue
                        isVisible={isTraingVisible}
                        countdownTime1={countdownTime1}
                        countdownTime2={countdownTime2}
                        onClose={() => setIsTrainingVisible(false)}
                        nextSong={nextSong}
                        pauseAudio={pauseAudio} 
                        audioRef={audioRef}
                        restoreVolume={() => restoreVolume(audioRef)}
                        reduceVolume={() => reduceVolume(audioRef)}
                    />
                </div>
            )}
        </>
    );
}