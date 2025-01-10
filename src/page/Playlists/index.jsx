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
                </ul>
        </>
    )
}