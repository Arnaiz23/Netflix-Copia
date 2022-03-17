import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import Footer from './Footer';
import Header from './Header';
import { config } from '../config';

class ModificarCuenta extends Component {

    url = config.url;

    emailRef = React.createRef();
    passwordRef = React.createRef();
    password2Ref = React.createRef();
    facturacionRef = React.createRef();

    state = {
        id: window.location.pathname.split("/")[2],
        cuenta: {
            email: "",
            password: "",
            facturacion: ""
        },
        redirect: null,
        cuenta2: {},
        usuarios: [],
        redirectCuenta: null,
        errorEmail: null,
        errorPassword: null
    }

    componentDidMount() {
        this.getUsuario();
    }

    rellenarData = () => {
        this.setState({
            cuenta: {
                email: this.emailRef.current.value,
                password: this.passwordRef.current.value,
                facturacion: this.facturacionRef.current.value
            }
        });
    }

    getUsuario = () => {
        let token = {
            token: localStorage.getItem("token")
        };

        axios.post(this.url + "cuenta", token)
            .then(res => {
                // console.log(res.data.usuario[0]);
                this.setState({
                    cuenta2: res.data.usuario[0],
                    usuarios: res.data.usuario[0].usuarios
                });
                // this.getUsuarios();
            })
            .catch(err => {
                this.setState({
                    redirect: true
                });
            });
    }

    modificar = (e) => {
        e.preventDefault();
        this.rellenarData();

        if (this.passwordRef.current.value == this.password2Ref.current.value) {
            axios.put(this.url + 'cuentas/' + this.state.cuenta2._id, this.state.cuenta)
                .then(res => {
                    // console.log(res.data);
                    this.setState({
                        redirectCuenta: true
                    });
                })
                .catch(err => {
                    if (err.response.data.message === "Ese email ya esta en uso") {
                        this.setState({
                            errorEmail: true
                        });
                    }
                });
        } else {
            this.setState({
                errorPassword: true
            });
        }

    }

    eliminarCuenta = () => {
        if (window.confirm("Estas seguro??")) {
            axios.delete(this.url + 'cuentas/' + this.state.cuenta2._id)
                .then(res => {
                    this.setState({
                        redirect: true
                    });
                });
        }
    }

    mostrarPassword = (e) => {
        let icono = e.target;
        let password = e.target.previousElementSibling;

        if(password.type == "text"){
            password.type = "password";
        }else{
            password.type = "text";
        }

        if(icono.classList.contains("fa-eye-slash")){
            icono.classList.remove("fa-eye-slash");
            icono.classList.add("fa-eye");
        }else{
            icono.classList.remove("fa-eye");
            icono.classList.add("fa-eye-slash");
        }
        
    }

    render() {

        if (this.state.redirect) return <Navigate to={'/login'} />

        if (this.state.redirectCuenta) return <Navigate to={'/redirectCuenta/' + this.state.id} />

        return (
            <React.Fragment>
                <Header inicio="true" id={this.state.id} />
                <main className="mainInicio">
                    <h2>Cuenta</h2>
                    <div className='linea'></div>
                    <form onSubmit={this.modificar} className="formCuenta">
                        <div className='formCuentaCampo'>
                            <label htmlFor='email'>Email</label>
                            <input type="email" placeholder={this.state.cuenta2.email} id='email' ref={this.emailRef} onChange={this.rellenarData} />
                            {this.state.errorEmail &&
                                <p className='errorTexto'>Ese email ya esta en uso</p>
                            }
                        </div>
                        <div className='formCuentaCampo'>
                            <label htmlFor='password'>Contraseña</label>
                            <span>
                                <input type="password" placeholder="password" id='password' ref={this.passwordRef} onChange={this.rellenarData} />
                                <i className="fa-solid fa-eye-slash passwordCuenta passwordCuentaShow" onClick={this.mostrarPassword}></i>
                            </span>
                        </div>
                        <div className='formCuentaCampo'>
                            <label htmlFor='password'>Confirmación</label>
                            <span>
                                <input type="password" placeholder="password" id='password' ref={this.password2Ref} onChange={this.rellenarData} />
                                <i className="fa-solid fa-eye-slash passwordCuenta passwordCuentaShow" onClick={this.mostrarPassword}></i>
                            </span>
                            {this.state.errorPassword &&
                                <p className='errorTexto'>Las contraseñas no coinciden</p>
                            }
                        </div>
                        <div className='formCuentaCampo'>
                            <label htmlFor='facturacion'>Facturación</label>
                            <input type="text" placeholder={this.state.cuenta2.facturacion} id='facturacion' ref={this.facturacionRef} onChange={this.rellenarData} />
                        </div>

                        <input type='submit' value='Confirmar' className='btn btn-success' id='confirmarCuenta' />
                    </form>

                    <div className='linea'></div>
                    <h2 id='eliminarCuenta'>Eliminar cuenta:</h2>
                    <p className='btn btn-danger' id='eliminarCuentaBtn' onClick={this.eliminarCuenta}>Eliminar</p>
                </main>
                <Footer inicio="true" />
            </React.Fragment>
        )
    }
}

export default ModificarCuenta;