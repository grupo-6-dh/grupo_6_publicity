import React, { Component } from "react";
import './totalesUsuarios.css';


class totalesUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: ""
        }
    }
    async componentDidMount() {

        fetch('http://localhost:3001/api/users')
            .then(response => response.json())
            .then(data => this.setState({ count: data.count },))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <table>
                <div className="TotalUsuarios">
                    <h4>Total de Usuarios: {this.state.count}</h4>
                </div>
            </table>


        );
    }

}


export default totalesUsuarios;