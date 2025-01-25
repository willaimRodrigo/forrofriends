import MusicPlayer from "../../components/MusicPlayer";
import { preLenta, preMedia, preArrastape, preRapida } from "../../utils/pre";
import { useState } from "react";
import { PreExameAlarm } from "../../components/Funcions/PreExamAlarm";

export const Pre = () => {
    const [ selectedAlbum, setSelectedAlbum ] = useState(preLenta);

    const handleAlbumChage = (album) => {
        setSelectedAlbum(album);
    }

    return (
        <>
            <h3>Pré Inzame</h3>
            <p>Escolha uma categoria:</p>

            <ul>
                <li>
                    <button onClick={() => handleAlbumChage(preLenta)}>Lentas</button>
                </li>
                <li>
                    <button onClick={() => handleAlbumChage(preMedia)}>Médias</button>
                </li>
                <li>
                    <button onClick={() => handleAlbumChage(preArrastape)}>Arrasta-pés</button>
                </li>
                <li>
                    <button onClick={() => handleAlbumChage(preRapida)}>Rápidas</button>
                </li>
            </ul>
            <MusicPlayer album={selectedAlbum} />
            <h4>Temporizador do pré está sendo implementado, tenhamos paciência</h4>
        </>
    )
}