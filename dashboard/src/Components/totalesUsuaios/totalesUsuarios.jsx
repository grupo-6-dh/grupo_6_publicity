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
            <div className="usuarios">
                <h4 className="titulo-usuarios">Usuarios</h4>
                <div className="TotalUsuarios">
                    <h1>{this.state.count}</h1>
                </div>
            </div>

        );
    }

}


export default totalesUsuarios;