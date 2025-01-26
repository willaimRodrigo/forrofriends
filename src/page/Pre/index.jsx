import MusicPlayer from "../../components/MusicPlayer";
import { preLenta, preMedia, preArrastape, preRapida } from "../../utils/pre";
import { useState } from "react";
import "./style.scss";
import { Tutorials } from "../../components/Tutorials";

export const Pre = () => {
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const handleAlbumChage = (album) => {
        setSelectedAlbum(album);
    };


    return (
        <section className="pre-section">
            <h3>Pré Inzame</h3>
            <p>Escolha uma categoria:</p>

            <ul className="category-list">
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
            {selectedAlbum && <MusicPlayer album={selectedAlbum} 
                enabledTimers={{
                    blues: false,
                    blackBlue: false,
                    preExam: true,
                }}
            />}
        </section>
    );
};
