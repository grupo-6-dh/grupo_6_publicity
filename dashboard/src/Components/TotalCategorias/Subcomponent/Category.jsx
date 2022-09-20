import React from "react";
import './Category.css';

function Category(props){
    return(
        props.data.map((item) =>
        <div className="categoria"> 
            <i>{item.productCategory}</i>
            <h1>{item.productCount}</h1>
        </div>
        )
    )
}

export default Category;
