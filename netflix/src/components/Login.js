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
        redirect: null,
        error: null,
        password: "password"
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
                    redirect: true
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

        axios.post(this.url + 'comprobar-cuenta', this.state.cuenta)
            .then(res => {
                // console.log(res.data);
                localStorage.setItem("token", res.data.token);
                this.setState({
                    redirect: true
                });
            })
            .catch(err => {
                // console.log(err);
                this.setState({
                    error: true
                });
            });
    }

    mostrarPassword = () => {
        let password = document.querySelector("#password");
        if(this.state.password == "text"){
            this.setState({
                password: "password"
            });
        }else{
            this.setState({
                password: "text"
            });
        }
    }

    render() {

        if (this.state.redirect) return <Navigate to={'/cuentas'} />

        return (
            <div id="inicioLogin">
                <div id="inicioLoginOscuro">
                    <Header login="true" />

                    <div id="inicioMain">
                        <div id="login">
                            <h2>Iniciar sesión</h2>
                            <form onSubmit={this.comprobar}>

                                {this.state.error ?
                                    (
                                        <React.Fragment>
                                            <input type="text" placeholder="Correo electrónico o número de teléfono" id="loginCorreo" ref={this.emailRef} onChange={this.rellenar} className="incorrectLoginInput" />
                                            <p className="incorrectLoginWarning">Escribe un número de teléfono o un correo válidos.</p>
                                        </React.Fragment>
                                    ) : (
                                        <input type="text" placeholder="Correo electrónico o número de teléfono" id="loginCorreo" ref={this.emailRef} onChange={this.rellenar} />
                                    )
                                }
                                {this.state.error ?
                                    (
                                        <React.Fragment>
                                            <div id="loginPassword">
                                                <input type={this.state.password} placeholder="Contraseña" ref={this.passwordRef} onChange={this.rellenar} className="incorrectLoginInput" id="password" />
                                                <i className="fa-solid fa-eye-slash passwordEye" onClick={this.mostrarPassword}></i>
                                            </div>
                                            <p className="incorrectLoginWarning">La contraseña debe tener entre 4 y 60 caracteres.</p>
                                        </React.Fragment>
                                    ) : (
                                        <div id="loginPassword">
                                            <input type={this.state.password} placeholder="Contraseña" ref={this.passwordRef} onChange={this.rellenar} id="password" />
                                            <i className="fa-solid fa-eye-slash passwordEye" onClick={this.mostrarPassword}></i>
                                        </div>
                                    )
                                }

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
                            <a href="https://www.facebook.com" target={'_blank'} id="loginFacebook">
                                <i className="fa-brands fa-facebook loginFacebook-icon"></i>
                                 Iniciar sesión con Facebook
                            </a>
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