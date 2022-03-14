import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

import Footer from "./Footer";
import Header from "./Header";

import { config } from '../config';

class Login extends Component {

    url = config.url;

    emailRef = React.createRef();
    passwordRef = React.createRef();

    state = {
        cuenta: {},
        redirect: null
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
                // console.log(res.data);
                this.setState({
                    redirect : true
                });
            })
            .catch(err => {
                // console.log(err);
            });
    }

    rellenar = (e) => {
        this.setState({
            cuenta: {
                email: this.emailRef.current.value,
                password: this.passwordRef.current.value
            }
        });
    }

    comprobar = (e) => {
        e.preventDefault();
        this.rellenar();
        
        axios.post(this.url+'comprobar-cuenta',this.state.cuenta)
            .then(res => {
                // console.log(res.data);
                localStorage.setItem("token", res.data.token);
                this.setState({
                    redirect: true
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {

        if(this.state.redirect) return <Navigate to={'/cuentas'} />

        return (
            <div id="inicioLogin">
                <div id="inicioLoginOscuro">
                    <Header login="true" />

                    <div id="inicioMain">
                        <div id="login">
                            <h2>Iniciar sesión</h2>
                            <form onSubmit={this.comprobar}>
                                <input type="text" placeholder="Correo electrónico o número de teléfono" id="loginCorreo" ref={this.emailRef} onChange={this.rellenar} />
                                {/* <p className="incorrectLoginWarning">Escribe un número de teléfono o un correo válidos.</p> */}
                                <div id="loginPassword">
                                    <input type="password" placeholder="Contraseña" ref={this.passwordRef} onChange={this.rellenar} />
                                    <p id="passwordMostrar">MOSTRAR</p>
                                    <p id="passwordOcultar">OCULTAR</p>
                                </div>
                                {/* <p className="incorrectLoginWarning">La contraseña debe tener entre 4 y 60 caracteres.</p> */}
                                <input type="submit" value="Iniciar sesión" className="btn btn-danger" id="loginEnviar" />
                            </form>


                            <div id="loginOpciones">
                                <div id="loginRecuerdame">
                                    <input type="checkbox" id="recuerdame" />
                                    <label htmlFor="recuerdame">Recuérdame</label>
                                </div>
                                <a href="">¿Necesitas ayuda?</a>
                            </div>
                            <a href="" id="loginFacebook"> Iniciar sesión con Facebook</a>
                            <p id="loginRegisterInfo">¿Todavía sin Netflix? <Link to={'/register'}>Suscríbete ya</Link>.</p>
                            <p id="loginCatpcha">Esta página utiliza Google reCAPTCHA para garantizar que no eres un robot. <a
                                href="">Más
                                información</a></p>
                        </div>
                    </div>

                    <Footer registro="true" />
                </div>
            </div>
        )
    }
}

export default Login;