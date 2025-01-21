import { Link } from "react-router-dom";

import "./style.scss";

export const Footer = () => {
    return (
        <div className="container-footer">
         <h4>Treinando com os migos</h4>
            <Link to="/About">
                <img className="logo"
                    src="/img/logo-forrofriends.jpeg"
                    alt="logotipo da aplicação"
                />
            </Link>
        </div>
    )
    
}