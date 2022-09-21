import React, { Component } from "react";
import './totalesProductos.css';


class totales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: "",
            categoria: [],
            usuarios: ""
        }
    }
    async componentDidMount() {

        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => this.setState({ count: data.count },))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="productos">
                <h4 className="titulo-productos">Productos</h4>
                <div className="TotalProductos">
                    <h1>{this.state.count}</h1>
                </div>
            </div>

        );
    }

}


export default totales;