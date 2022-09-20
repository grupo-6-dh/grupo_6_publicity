import React from "react";

import Cantidad from "../ejemploPanel/Cantidad";
import Header from "../Header/Header";
import ListadoProductos from "../ListadoProductos/ListadoProductos";
import UltimoProducto from "../UltimoProducto/UltimoProducto";
import TotalCategorias from "../TotalCategorias/TotalCategorias";
import panelTotales from "../panelTotales/panelTotales";

import './TemplateDashboard.css'
function TemplateDashboard(){
    return(
        <div className="principal">
            <div className="cabecera">
                <Header/>
            </div>
            <div className="cuerpo">
                
                <Cantidad/>
                
                <ListadoProductos/>
                <UltimoProducto/>
                <TotalCategorias/>
                <panelTotales/>

            </div>
        </div>
    )
}

export default TemplateDashboard;