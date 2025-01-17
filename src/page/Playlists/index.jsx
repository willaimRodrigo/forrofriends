import { Link } from "react-router-dom";

import "./style.scss";

export const Playlists = () => {
    return (
        <>
            <h2>Escolha um álbum</h2>

            <nav>
                <ul className="ul-album">
                    <li className="list-album">
                        <Link to="/pre">Pre Inzame</Link>
                    </li>
                    <li className="list-album">
                        <Link to="/black">Preta</Link>
                    </li>
                    <li className="list-album">
                        <Link to="/blueadv">Azul Avançada</Link>
                    </li>
                    <li className="list-album">
                        <Link to="/blueint">Azul Intermediária</Link>
                    </li>   
                    <li className="list-album">
                        <Link to="/blue">Azul Bebe</Link>
                    </li>
                    <li className="list-album">
                        <Link to="/white">Branca</Link>
                    </li>
                    <li className="list-album">
                        <Link to="/party">Baile</Link>
                    </li>
                </ul>
            </nav>
                
        </>
    )
}