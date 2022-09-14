import React from "react";
import Cantidad from "../ejemploPanel/Cantidad";
import Header from "../Header/Header";
import ListadoProductos from "../ListadoProductos/ListadoProductos";
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
            </div>
        </div>
    )
}

export default TemplateDashboard;