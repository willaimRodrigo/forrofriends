import { useState, useRef, useEffect } from "react";
import { shuffleArray } from "../Funcions/functions";
import TimerComponent from "../Funcions/TimerComponent";

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


export default function MusicPlayer({ album, timerDuration }) {
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playlist, setPlaylist] = useState(album);
  const [originalPlaylist, setOriginalPlaylist] = useState([]);
  const [isShuffled, setIsShuffdle] = useState(false);

  useEffect(() => {
    setPlaylist(album);
    setOriginalPlaylist(album);
    setCurrentSongIndex(0);
    if (album.length > 0) {
        audioRef.current.src = album[0].src;
    }
  }, [album]);

  const playAudio = () => {
    audioRef.current.play();
  }

  const pauseAudio = () => {
    audioRef.current.pause();
  }

  const nextSong = () => {
    let nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    audioRef.current.src = playlist[nextIndex].src;
    audioRef.current.play();
  }

  const prevSong = () => {
    let prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
    audioRef.current.src = playlist[prevIndex].src;
    audioRef.current.play();
  }

  const restartSong = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }

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
    setIsShuffdle(!isShuffled);
    audioRef.current.play();
  }

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
      <button onClick={restartSong}>refresh</button>
      <button onClick={toggleShuffle}>
        {isShuffled ? 'Desativar Aleatório' : 'Reprodução Aleatória'}
      </button>

      <h3>Tocando: {playlist[currentSongIndex].name}</h3>

      <TimerComponent />
    </>
  )
}