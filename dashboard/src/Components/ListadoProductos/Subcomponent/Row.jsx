import React from "react";

function Row(props){
    return(
        <tr>
            <td>{props.rowData.name}</td>
            <td>{props.rowData.bag_size}</td>
            <td>{props.rowData.description}</td>
        </tr>
    )
}

export default Row;


