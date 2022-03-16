import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import SimpleReactValidator from "simple-react-validator";

import Footer from "./Footer";
import Header from "./Header";

import { config } from '../config';

class Registro extends Component {

    url = config.url;

    emailRef = React.createRef();
    passwordRef = React.createRef();
    tarjetaRef = React.createRef();

    validator = new SimpleReactValidator({
        messages: {
            required: "Este campo es obligatorio",
            email: "Este campo debe ser un correo válido"
        }
    });

    state = {
        cuenta: {},
        redirect: null,
        error: null,
        password: "password"
    }

    rellenar = (e) => {
        this.setState({
            cuenta: {
                email: this.emailRef.current.value,
                password: this.passwordRef.current.value,
                facturacion : this.tarjetaRef.current.value,
            }
        });
    }

    comprobar = (e) => {
        e.preventDefault();
        this.rellenar();

        if(this.validator.allValid()){
            // console.log(this.state.cuenta);
            axios.post(this.url + 'cuentas', this.state.cuenta)
                .then(res => {
                    // console.log(res.data);
                    this.setState({
                        redirect: true
                    });
                })
                .catch(err => {
                    this.setState({
                        error : true
                    })
                })
        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    mostrarPassword = () => {
        let password = document.querySelector("#password");
        if (this.state.password == "text") {
            this.setState({
                password: "password"
            });
        } else {
            this.setState({
                password: "text"
            });
        }
    }

    render() {

        if (this.state.redirect) return <Navigate to={'/login'} />

        return (
            <div id="inicioLogin">
                <div id="inicioLoginOscuro">
                    <Header login="true" />

                    <div id="inicioMain">
                        <div id="login">
                            <h2>Registro</h2>
                            <form onSubmit={this.comprobar}>

                                <input type="text" name="correo" placeholder="Correo electrónico o número de teléfono" id="loginCorreo" ref={this.emailRef} onChange={this.rellenar} />

                                {this.validator.message('correo', this.state.cuenta.email, 'required|email')}

                                <div id="loginPassword">
                                    <input type={this.state.password} name="password" placeholder="Contraseña" ref={this.passwordRef} onChange={this.rellenar} id="password" />
                                    <i className="fa-solid fa-eye-slash passwordEye" onClick={this.mostrarPassword}></i>
                                </div>

                                {this.validator.message('password', this.state.cuenta.password, 'required|min:8', {
                                    messages : {
                                        min: "La contraseña debe tener al menos 8 caracteres"
                                    }
                                })}

                                <input type="text" name="tarjeta" placeholder="Tarjeta de crédito" ref={this.tarjetaRef} onChange={this.rellenar} />

                                {this.validator.message('tarjeta', this.state.cuenta.facturacion, 'required|numeric|size:16', {
                                    messages : {
                                        size: "Debe tener 16 numeros"
                                    }
                                })}

                                <input type="submit" value="Registrarse" className="btn btn-danger" id="loginEnviar" />
                            </form>


                            <div id="loginOpciones">
                                <span></span>
                                <a href="">¿Necesitas ayuda?</a>
                            </div>
                            <a href="https://www.facebook.com" target={'_blank'} id="loginFacebook">
                                <i className="fa-brands fa-facebook loginFacebook-icon"></i>
                                Iniciar sesión con Facebook
                            </a>
                            <p id="loginRegisterInfo">¿Tienes cuenta? <Link to={'/login'}>Inicia sesión</Link>.</p>
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

export default Registro;