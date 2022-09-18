import React from "react";
import './Header.css';
import { Link, Routes } from 'react-router-dom';
import Logo from "../../Assets/img/LOGO_BLANCO.png";
// import Producto from "../Producto/Producto";

function Header(){
    return(
        <div className="main">
            <div className="logo">
                <img src={Logo} alt="logo Publicity"/>   
            </div>
            <div className="nav-bar">
                <ul>
                   <li><Link to='/'><i className="fa-solid fa-house"></i> Inicio </Link></li>
                    <li><Link to='/productos'><i className="fa-solid fa-bag-shopping"></i> Productos</Link></li>
                    <li><Link to='#'><i className="fa-regular fa-user"></i> Usuarios</Link></li>
                    
                </ul>
            </div>
            
            <Routes>
                {/* Ejemplo de ruta */}
                {/* <Route  path='/productos' element={<Producto/>} />  */}
                
            </Routes>
            
        </div>
    )
}

export default Header;