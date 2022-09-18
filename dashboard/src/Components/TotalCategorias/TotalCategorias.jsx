import React, {Component} from "react";
import './TotalCategorias.css';
import Category from "./Subcomponent/Category";
class ListadoProductos extends Component{
    constructor (props){
        super(props);
        this.state = {
            categorias: []
        }
    }
   async componentDidMount(){
    
    fetch('http://localhost:3001/api/products')
    .then( response => response.json() )
    .then( data => this.setState({categorias : data.countByCategory}))
    .catch ( error => console.log (error))
    }

    render(){
        let contenido = this.state.categorias

        return ( 
            
            <div className="panelCategorias">
            <h1>Total por categorias</h1>
                <div>
                    <Category data = {contenido} ></Category>
                </div>
            </div>
        	);
    }
    
}


export default ListadoProductos;