
import React from "react";
import Row from "./Row";

function Table(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Temaño</th>
                    <th>Descripcion</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.products.map((element, i) =>  <Row key={element.title+i} rowData={element} />)
                }
            </tbody>
        </table>
    )
}

export default Table;