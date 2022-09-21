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
            <table>
                <div className="TotalProductos">
                    <div>
                        <h4>Total de Productos: {this.state.count}</h4>
                    </div>
                </div>
            </table>

        );
    }

}


export default totales;