import React, { Component } from "react";
import './totalePorCategorias.css';



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

            <table>
                <div className="TotalPorCategorias">
                    <h4>Total por categorias: {this.state.categorias.length}</h4>
                </div>
            </table>


        );
    }

}


export default totalesPorCategorias;