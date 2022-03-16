import React, { Component } from "react";
import axios from "axios";

import Header from "./Header";
import { config } from '../config';

import iconoCuenta from '../assets/images/iconoCuenta.jpg';
import { Link, Navigate } from "react-router-dom";

class Cuentas extends Component {

    url = config.url;

    state = {
        redirect: null,
        cuenta: {},
        usuarios: [],
        login: null,
        edit: null
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
                });
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
                        let usuarios = this.state.usuarios;
                        usuarios.push(res.data.message);

                        this.setState({
                            usuarios: usuarios
                        });
                    }
                })
        })
    }

    irLogin = (e) => {
        if(this.state.edit){
            this.eliminarUsuario(e.currentTarget.id);
        }else{
            this.setState({
                login: e.currentTarget.id
            });
        }
    }

    editar = () => {
        if(this.state.edit){
            this.setState({
                edit: null
            });
        }else{
            this.setState({
                edit: true
            });
        }
    }

    eliminarUsuario = (id) =>{
        // console.log(id);
        axios.delete(this.url + 'usuario/' + id)
            .then(res => {
                // console.log(res.data);
                let usuarios = this.state.usuarios;
                usuarios = usuarios.filter((dato) =>{
                    if(dato._id == id){
                        return false;
                    }else{
                        return true;
                    }
                });

                // console.log(usuarios);
                let data = {
                    usuarios : usuarios
                }

                axios.put(this.url + "cuentas/"+this.state.cuenta._id, data)
                    .then(res => {
                        // console.log(res.data);
                        this.setState({
                            usuarios : usuarios
                        });
                    });
            });
    } 

    render() {

        if (this.state.login) return <Navigate to={'/inicio/' + this.state.login} />

        if (this.state.redirect) return <Navigate to={'/login'} />

        if (this.state.usuarios.length >= 1) {
            // {console.log(this.state.usuarios);}
            let listaUsuarios = this.state.usuarios.map(usuario => {
                return (
                    <div className="cuenta" key={usuario._id} id={usuario._id} onClick={this.irLogin}>
                        {this.state.edit &&
                            <div className="cuentaAdmin" id={usuario._id}>
                                <i className="fa-solid fa-trash-can"></i>
                            </div>
                        }
                        <img src={iconoCuenta} alt="icono cuenta netflix" className="icon-cuenta" />
                        <h3 className="cuentaNombre">{usuario.nombre}</h3>
                    </div>
                )
            });
            return (
                <React.Fragment>
                    <Header login="true" />

                    <main className="mainCuenta">
                        {this.state.edit ?
                            (
                                <h2>Administrar perfiles:</h2>
                            ) : (
                                <h2>¿Quién eres? Elige tu perfil</h2>
                            )
                        }
                        <div className="cuentas">
                            {listaUsuarios}
                            <Link to={'/new-cuenta'} className="cuenta">
                                <i className="fa-solid fa-circle-plus" id="addPerfil"></i>
                                <h3 className="cuentaNombre">Añadir perfil</h3>
                            </Link>
                        </div>
                        {this.state.edit ?
                            (
                                <p onClick={this.editar} className="btn btn-light" id="administrarCuentas">Listo</p>
                            ) : (
                                <p onClick={this.editar} className="btn btn-transparent" id="administrarCuentas">Administrar perfiles</p>
                            )
                        }
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
                            <Link to={'/new-cuenta'} className="cuenta">
                                <i className="fa-solid fa-circle-plus" id="addPerfil"></i>
                                <h3 className="cuentaNombre">Añadir perfil</h3>
                            </Link>
                        </div>
                        <p className="btn btn-transparent" id="administrarCuentas">Administrar perfiles</p>
                    </main>
                </React.Fragment>
            )
        }
    }
}

export default Cuentas;