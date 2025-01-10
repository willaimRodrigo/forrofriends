import { Link } from "react-router-dom"


export const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Playlists">Playlists</Link>
                    </li>
                    <li>
                        <Link to="/About">Sobre nós</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}