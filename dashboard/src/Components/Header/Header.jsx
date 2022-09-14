import React from "react";
import './Header.css';
import Logo from "../../Assets/img/LOGO_BLANCO.png";

function Header(){
    return(
        <div className="main">
            <div className="logo">
                <img src={Logo} alt="logo Publicity"/>   
            </div>
            <div className="nav-bar">
                <ul>
                    <li><i className="fa-solid fa-house"></i> Inicio</li>
                    <li><i className="fa-solid fa-bag-shopping"></i> Productos</li>
                    <li><i className="fa-regular fa-user"></i> Usuarios</li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Header;