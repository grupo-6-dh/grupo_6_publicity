import React, {Component} from "react";
import './ListadoProductos.css';
import Table from "./Subcomponent/Table";

class ListadoProductos extends Component{
    constructor (props){
        super(props);
        this.state = {
            productos: []
        }
    }
   async componentDidMount(){
    
    fetch('http://localhost:3001/api/products')
    .then( response => response.json() )
    .then( data => this.setState({productos : data.products}))
    .catch ( error => console.log (error))
    }

    render(){
        let contenido = this.state.productos
        
      
        
        // const tabla = contenido.map((item) =>
        //     <tr> 
        //         <td key={item.id}>{item.name}</td>
        //         <td key={item.id}>{item.bag_size}</td>
        //         <td key={item.id}>{item.description}</td>
        //     </tr>
        // );
       
        return ( 
            
            <div className="panelProductos">
            <h1>Productos</h1>
                <div className="tablaProductos">
                    <Table products={contenido}/>
                </div>
            </div>
        	);
          
    }
    
}


export default ListadoProductos;