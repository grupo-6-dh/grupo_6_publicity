import React from "react";

import Cantidad from "../ejemploPanel/Cantidad";
import Header from "../Header/Header";
import ListadoProductos from "../ListadoProductos/ListadoProductos";
import UltimoProducto from "../UltimoProducto/UltimoProducto";
import TotalCategorias from "../TotalCategorias/TotalCategorias";
import './TemplateDashboard.css'
function TemplateDashboard(){
    return(
        <div className="principal">
            <div className="cabecera">
                <Header/>
            </div>
            <div className="cuerpo">
                <div className="lateral-izquierdo">
                <TotalCategorias/>    
                </div>
                <div className="lateral-derecho">
                <UltimoProducto/>
                <ListadoProductos/>
                </div>
                
                
            </div>
        </div>
    )
}

export default TemplateDashboard;