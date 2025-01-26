import { Link } from "react-router-dom";

import "./style.scss";


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
                        <Link to="/About">Sobre o App</Link>
                    </li>
                    <li>
                        <Link to="/Tutorials">Tutorial</Link>
                    </li>
                </ul>
                <img className="logo"
                 src="/img/logo-forrofriends.jpeg"
                  alt="logotipo da aplicação" 
                  />
            </nav>
            
        </header>
    )
}