import React from "react";
import './Category.css';

function Category(props){
    return(
        props.data.map((item) =>
        <div className="categoria"> 
            <i className="titulo-categoria">{item.productCategory}</i>
            <h1 className="numero">{item.productCount}</h1>
        </div>
        )
    )
}

export default Category;
