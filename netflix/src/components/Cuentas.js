import React, { Component } from "react";
import axios from "axios";

import Header from "./Header";
import { config } from '../config';

import iconoCuenta from '../assets/images/iconoCuenta.jpg';

class Cuentas extends Component {

    url = config.url;

    state = {
        redirect: null,
        cuenta: {},
        usuarios: []
    }

    componentDidMount() {
        this.getCuenta();
    }

    getCuenta = () => {
        let token = {
            token: localStorage.getItem("token")
        };

        axios.post(this.url + "cuenta", token)
            .then(res => {
                // console.log(res.data.usuario[0]);
                this.setState({
                    cuenta: res.data.usuario[0]
                });
                this.getUsuarios();
            })
            .catch(err => {
                this.setState({
                    redirect: true
                })
            });
    }

    getUsuarios = () => {
        let usuarios = [];
        this.state.cuenta.usuarios.map(usuario => {
            axios(this.url + 'usuario/' + usuario)
                .then(res => {
                    if (this.state.usuarios.length == 0) {
                        this.setState({
                            usuarios: [
                                res.data.message
                            ]
                        });
                    } else {
                        this.setState({
                            usuarios: [
                                this.state.usuarios[0],
                                res.data.message
                            ]
                        });
                    }
                })
        })
    }

    render() {
        if (this.state.usuarios.length >= 1) {
            let listaUsuarios = this.state.usuarios.map(usuario => {
                return (
                    <div className="cuenta" key={usuario._id}>
                        <img src={iconoCuenta} alt="icono cuenta netflix" className="icon-cuenta" />
                        <h3 className="cuentaNombre">{usuario.nombre}</h3>
                    </div>
                )
            });
            return (
                <React.Fragment>
                    <Header login="true" />

                    <main className="mainCuenta">
                        <h2>¿Quién eres? Elige tu perfil</h2>
                        <div className="cuentas">
                            {listaUsuarios}
                            <div className="cuenta">
                                <i className="fa-solid fa-circle-plus" id="addPerfil"></i>
                                <h3 className="cuentaNombre">Añadir perfil</h3>
                            </div>
                        </div>
                        <a href="" className="btn btn-transparent" id="administrarCuentas">Administrar perfiles</a>
                    </main>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Header login="true" />

                    <main className="mainCuenta">
                        <h2>¿Quién eres? Elige tu perfil</h2>
                        <div className="cuentas">
                            <div className="cuenta">
                                <i className="fa-solid fa-circle-plus" id="addPerfil"></i>
                                <h3 className="cuentaNombre">Añadir perfil</h3>
                            </div>
                        </div>
                        <a href="" className="btn btn-transparent" id="administrarCuentas">Administrar perfiles</a>
                    </main>
                </React.Fragment>
            )
        }
    }
}

export default Cuentas;