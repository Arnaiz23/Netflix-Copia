import React, { Component } from "react";
import { Link } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

class Login extends Component {
    render() {
        return (
            <div id="inicioLogin">
                <div id="inicioLoginOscuro">
                    <Header login="true" />

                    <div id="inicioMain">
                        <div id="login">
                            <h2>Iniciar sesión</h2>
                            <input type="text" placeholder="Correo electrónico o número de teléfono" id="loginCorreo" />
                            {/* <p className="incorrectLoginWarning">Escribe un número de teléfono o un correo válidos.</p> */}
                            <div id="loginPassword">
                                <input type="password" placeholder="Contraseña" />
                                <p id="passwordMostrar">MOSTRAR</p>
                                <p id="passwordOcultar">OCULTAR</p>
                            </div>
                            {/* <p className="incorrectLoginWarning">La contraseña debe tener entre 4 y 60 caracteres.</p> */}
                            <input type="submit" value="Iniciar sesión" className="btn btn-danger" id="loginEnviar" />

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