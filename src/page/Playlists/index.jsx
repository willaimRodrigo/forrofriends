import { Link } from "react-router-dom"

export const Playlists = () => {
    return (
        <>
            <h2>Escolha um álbum</h2>
                <ul>
                    <li>
                        <Link to="/black">Preta</Link>
                    </li>
                    <li>
                        <Link to="/blueadv">Azul Avançada</Link>
                    </li>
                    <li>
                        <Link to="/blue">Azul Bebe</Link>
                    </li>
                    <li>
                        <Link to="/party">Baile</Link>
                    </li>
                </ul>
        </>
    )
}