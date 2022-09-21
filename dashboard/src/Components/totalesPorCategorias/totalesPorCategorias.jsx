import React, { Component } from "react";
import './totalesPorCategorias.css';



class totalesPorCategorias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: []
        }
    }
    async componentDidMount() {

        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => this.setState({ categorias: data.countByCategory }))
            .catch(error => console.log(error))
    }

    render() {


        return (
            <div className="categorias">
                <h4 className="titulo-cat">Categorías</h4>
                <div className="TotalPorCategorias">
                    <h1>{this.state.categorias.length}</h1>
                </div>
            </div>

        );
    }

}


export default totalesPorCategorias;