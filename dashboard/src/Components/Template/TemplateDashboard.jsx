import React from "react";

import Cantidad from "../ejemploPanel/Cantidad";
import Header from "../Header/Header";
<<<<<<< HEAD
import ListadoProductos from "../ListadoProductos/ListadoProductos";
=======
import UltimoProducto from "../UltimoProducto/UltimoProducto";
>>>>>>> G6P-101-dashboard-en-react-modificar-css
import './TemplateDashboard.css'
function TemplateDashboard(){
    return(
        <div className="principal">
            <div className="cabecera">
                <Header/>
            </div>
            <div className="cuerpo">
                
                <Cantidad/>
                
<<<<<<< HEAD
                <ListadoProductos/>
=======
                <UltimoProducto/>
>>>>>>> G6P-101-dashboard-en-react-modificar-css
            </div>
        </div>
    )
}

export default TemplateDashboard;