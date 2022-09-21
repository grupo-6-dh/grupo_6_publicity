import React, {Component} from "react";
import './UltimoProducto.css';


class UltimoProducto extends Component{
    constructor(props){
        super(props);
        this.state ={
            producto : ""}
    }

    //la primera vez que se ejecuta no trae los datos de la api
    componentDidMount(){
        fetch('http://localhost:3001/api/lastProduct')
        .then(response => response.json()) 
        .then(data => this.setState({producto: data})) 
        .catch(err => console.log(err));

    }
    
    render(){
       
        return(
            
            <div className="producto">
                <div className="titulo">
                    <h1>Último producto añadido</h1>
                     <img src={this.state.producto.image} alt="bolsa" /> 
                <hr/>
                </div>
                <div className="descripcion">
                    <h3>{this.state.producto.name}</h3>
                    <h4 className="precio">${this.state.producto.price}</h4>
                    <p>Descripción: {this.state.producto.description}</p>
                </div>
            </div>
        )

    }
   
}

export default UltimoProducto;