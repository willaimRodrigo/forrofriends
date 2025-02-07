import { useState, useRef, useEffect } from "react";
import { shuffleArray } from "../Funcions/functions";
import TimerComponent from "../Funcions/TimerComponent";
import TimerBlues from "../Funcions/TimerBlues";
import TimerBlackBlue from "../Funcions/TimerblackBlue";

import "./style.scss";
import { PreExameAlarm } from "../Funcions/PreExamAlarm";

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

export default function MusicPlayer({ album, countdownTime1, countdownTime2, enabledTimers }) {
    const audioRef = useRef(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playlist, setPlaylist] = useState(album);
    const [originalPlaylist, setOriginalPlaylist] = useState([]);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isTimerVisible, setIsTimerVisible] = useState(false);
    const [isTraingVisible, setIsTrainingVisible] = useState(false);
    const [isListVisible, setIsListVisible] = useState(false);
    const [isTraininBlackVisible, setIsTraininBlackVisible] = useState(false);
    const [isTraininPreVisible, setIsTraininPreVisible] = useState(false);

    // Salva no cache quando a playlist mudar
    useEffect(() => {
        if (album && album.length > 0) {
            localStorage.setItem("currentPlaylist", JSON.stringify(album));
        }
    }, [album]);

    useEffect(() => {
        for (let i = 0; i <= 4; i++) {
        if (playlist[currentSongIndex + 1]) {
            const nextAudio = new Audio(playlist[currentSongIndex + 1].src);
            nextAudio.load();
            }
        }
    }, [currentSongIndex, playlist])

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

        } else if (album) {
            setPlaylist(album);
            setOriginalPlaylist(album);
            setCurrentSongIndex(0);

            if (album.length > 0) {
                audioRef.current.src = album[0].src;
            }

        }
    }, [album]);

    const pauseAudio = () => {
        audioRef.current.pause();
    };

    const playAudio = () => {
        audioRef.current.play();
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

    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible);
    };

    const toggleTrainingVisibilityBlack = () => {
        setIsTraininBlackVisible(!isTraininBlackVisible);
    };

    const toggleTrainingVisibilityPre = () => {
        setIsTraininPreVisible(!isTraininPreVisible);
    }

    const handleSongClick = (index) => {
        setCurrentSongIndex(index);
        audioRef.current.src = playlist[index].src;
        audioRef.current.play();
    };

    return (
        <>
            <section className="sectionplayer">
                <div className="divinfoplayer">
                    <h2>
                        <span className="scrolling-text">{playlist[currentSongIndex].name}</span>
                    </h2>
                    <h4>
                        <span className="scrolling-text">{playlist[currentSongIndex].band}</span>
                    </h4>
                </div>
                
                <audio className="control" ref={audioRef} controls preload="auto" onEnded={nextSong}>
                    <source src={playlist[currentSongIndex].src} type="audio/mp3" />
                </audio>
                <div>
                    <button className="buttonplayer" onClick={prevSong}>voltar</button>
                    <button className="buttonplayer" onClick={nextSong}>próxima</button>
                    <button className="buttonplayer" onClick={restartSong}>início</button>
                    <button className="buttonplayer" onClick={toggleShuffle}>
                        
                        {isShuffled ? "Aleatório On" : "Aleatório off"}
                    </button>
                </div>

                <div className="playlist-container">
                    <button className="button-list" onClick={toggleListVisibility}>
                        {isListVisible ? "Close " : "Músicas"}
                    </button>

                    {isListVisible && (
                        <ul className="playlist">
                            {playlist.map((song, index) => (
                                <li
                                    key={index}
                                    className={`playlist-item ${index === currentSongIndex ? "active" : ""
                                        }`}
                                    onClick={() => handleSongClick(index)}
                                >
                                    {song.name} - {song.band}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
            
            <div className="divtimers">
                <button onClick={toggleTimerVisibility}>
                    {isTimerVisible ? "Fechar Alerta" : "Agradeceu, Trocou"}
                </button>
                {isTimerVisible && (
                    <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
                        <TimerComponent
                            onTimerEnd={handleTimerEnd}
                            isActive={isTimerActive}
                            playAudio={playAudio}
                        />
                    </div>
                )}

                <button onClick={toggleTrainingVisibility} hidden={!enabledTimers.blues}>
                    {isTraingVisible ? "Fechar Simulador" : "Simular Exame"}
                </button>
                {isTraingVisible && (
                    <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
                        
                        <TimerBlues
                            isVisible={isTraingVisible}
                            countdownTime1={countdownTime1}
                            onClose={() => setIsTrainingVisible(false)}
                            nextSong={nextSong}
                            pauseAudio={pauseAudio} 
                            playAudio={playAudio}
                            audioRef={audioRef}
                            restoreVolume={() => restoreVolume(audioRef)}
                            reduceVolume={() => reduceVolume(audioRef)}
                        />
                    </div>
                    
                )}

                <button onClick={toggleTrainingVisibilityBlack} hidden={!enabledTimers.blackBlue}>
                    {isTraininBlackVisible ? "Fechar Simulador" : "Simular Exame"}
                </button>
                {isTraininBlackVisible && (
                    <section style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>

                        <TimerBlackBlue
                            isVisible={isTraininBlackVisible}
                            countdownTime1={countdownTime1}
                            countdownTime2={countdownTime2}
                            onClose={() => setIsTrainingVisible(false)}
                            nextSong={nextSong}
                            pauseAudio={pauseAudio}
                            playAudio={playAudio}
                            audioRef={audioRef}
                            restoreVolume={() => restoreVolume(audioRef)}
                            reduceVolume={() => reduceVolume(audioRef)}
                        />
                    </section>
                )}

                <section>
                    <button onClick={toggleTrainingVisibilityPre} hidden={!enabledTimers.preExam}>
                    {isTraininPreVisible ? "Fechar Simulador" : "Simular Pré Exme"}
                </button>
                {isTraininPreVisible && (
                    <section style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
                        <PreExameAlarm
                            countdownTime1={countdownTime1}
                            countdownTime2={countdownTime2}
                            audioRef={audioRef}
                            pauseAudio={pauseAudio}
                            playAudio={playAudio}
                        />
                    </section>
                )}
                </section>
                
            </div>
            
        </>
    );
}


{/* <button onClick={playAudio}>Play</button>
            // <button onClick={pauseAudio}>Pause</button> */}