import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

import { config } from '../config';
import { Navigate } from "react-router-dom";
import Header from "./Header";

class NewCuenta extends Component {

    nombreRef = React.createRef();

    url = config.url;

    validator = new SimpleReactValidator({
        messages: {
            required: 'Este campo es requerido'
        }
    });

    state = {
        usuario: {},
        redirect: null,
        usuarios: [],
        id: "",
        redirectLogin : null
    }

    componentDidMount() {
        let token = {
            token: localStorage.getItem("token")
        }
        axios.post(this.url + 'cuenta', token)
            .then(res => {
                this.setState({
                    usuarios: res.data.usuario[0].usuarios,
                    id: res.data.usuario[0]._id
                });
            })
            .catch(err =>{
                this.setState({
                    redirectLogin: true
                });
            })
    }

    rellenar = () => {
        this.setState({
            usuario: {
                nombre: this.nombreRef.current.value,
                miLista: []
            }
        });
    }

    crearUsuario = (e) => {
        e.preventDefault();
        this.rellenar();

        if (this.validator.allValid()) {

            // console.log(this.state.usuario);

            axios.post(this.url + 'usuario', this.state.usuario)
                .then(res => {
                    this.setState({
                        usuario: res.data.message
                    });
                    this.add();
                }).catch(err => {
                    this.setState({
                        status: 'failed'
                    });
                });

        } else {

            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();

        }
    }

    add = () => {
        let usuarios = this.state.usuarios;
        usuarios.push(this.state.usuario._id);
        let data = {
            usuarios: usuarios
        };
        axios.put(this.url + 'cuentas/' + this.state.id, data)
            .then(res => {
                this.setState({
                    redirect: true
                });
            });
    }

    render() {

        if (this.state.redirect) return <Navigate to={'/cuentas'} />

        if (this.state.redirectLogin) return <Navigate to={'/login'} />

        return (
            <React.Fragment>
                <Header login="true" />

                <form onSubmit={this.crearUsuario} className="newCuentaForm">
                    <h3>Nuevo usuario</h3>

                    <div className="newCuentaData">
                        <div className="newCuentaNombre">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" ref={this.nombreRef} onChange={this.rellenar} />
                            {this.validator.message('nombre', this.state.usuario.nombre, 'required')}
                        </div>
                    </div>

                    <input type="submit" className="btn btn-light" />
                </form>
            </React.Fragment>
        )
    }
}

export default NewCuenta;