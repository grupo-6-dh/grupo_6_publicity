import React from "react";
import Cantidad from "../ejemploPanel/Cantidad";
import Header from "../Header/Header";
import './TemplateDashboard.css'
function TemplateDashboard(){
    return(
        <div className="principal">
            <div className="cabecera">
                <Header/>
            </div>
            <div className="cuerpo">
                
                <Cantidad/>
                
            </div>
        </div>
    )
}

export default TemplateDashboard;