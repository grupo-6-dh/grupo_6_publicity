import React, {Component} from "react";
import './panelTotales.css';


class panelTotales extends Component{
    constructor(props){
        super(props);
        this.state ={
            producto : "",
            usuario: "",
            categoria: ""
        }
    }

    //la primera vez que se ejecuta no trae los datos de la api
    componentDidMount(){
        fetch('http://localhost:3001/api/products')
        .then(response => response.json()) 
        .then(data => this.setState({producto: data})) 
        .catch(err => console.log(err));

    }
    
    render(){
       
        return(
            
            <div className="producto">
                <div className="titulo"> 
                <hr/>
                </div>
                <div className="descripcion">
                    <h4>Precio: ${this.state.producto.count}</h4>
                </div>
            </div>
        )

    }
   
}

export default panelTotales;