import React from "react";
import './ListadoProductos.css';

function ListadoProductos(){
    return(
        <div className="panelProductos">
            <h1>Productos</h1>
            <div className="tablaProductos">
                <table>
                    <thead>
                        <tr>
                        <th>Producto</th>
                        <th>Temaño</th>
                        <th>Precio por unidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>  fila 1 columna 1 </td>
                        <td>  fila 1 columna 2 </td>
                        <td>  fila 1 columna 3 </td>
                        </tr>
                        <tr>
                        <td>fila 2 columna 1 </td>
                        <td>fila 2 columna 2 </td>
                        <td>fila 2 columna  </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListadoProductos;