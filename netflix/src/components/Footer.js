import React, { Component } from "react";

class Footer extends Component {
    render() {
        if (this.props.registro === "true") {
            return (
                <div id="inicioFooter">
                    <div id="inicioFooterCenter">
                        <div>
                            <p>¿Preguntas? Llama al <span>900 822 376</span></p>
                        </div>
                        <ul className="inicioOpciones">
                            <li><a href="">Preguntas frecuentes</a></li>
                            <li><a href="">Centro de ayuda</a></li>
                            <li><a href="">Términos de uso</a></li>
                            <li><a href="">Privacidad</a></li>
                            <li><a href="">Preferencias de cookies</a></li>
                            <li><a href="">Información corporativa</a></li>
                        </ul>
                        <div>
                            <div className="icon-world">
                                <select className="inicioIdioma">
                                    <option value="spa">Español</option>
                                    <option value="eng">English</option>
                                </select>
                            </div>
                        </div>
                        <p id="netflixFooter">Netflix España</p>
                    </div>
                </div>
            )
        }

        if (this.props.inicio === "true") {
            return (
                <footer className="footer">
                    <div className="center">
                        <div className="redes">
                            <span className="redSocial">
                                <i className="fa-brands fa-facebook-f"></i>
                            </span>
                            <span className="redSocial">
                                <i className="fa-brands fa-instagram"></i>
                            </span>
                            <span className="redSocial">
                                <i className="fa-brands fa-twitter"></i>
                            </span>
                            <span className="redSocial">
                                <i className="fa-brands fa-youtube"></i>
                            </span>
                        </div>
                        <div className="footerInformacion">
                            <ul className="inicioOpciones">
                                <li><a href="">Audio y subtítulos</a></li>
                                <li><a href="">Audiodescripcion</a></li>
                                <li><a href="">Centro de ayuda</a></li>
                                <li><a href="">Tarjetas regalo</a></li>
                                <li><a href="">Zona de prensa</a></li>
                                <li><a href="">Inversores</a></li>
                                <li><a href="">Empleo</a></li>
                                <li><a href="">Términos de uso</a></li>
                                <li><a href="">Privacidad</a></li>
                                <li><a href="">Avisos legales</a></li>
                                <li><a href="">Preferencias de cookies</a></li>
                                <li><a href="">Información corporativa</a></li>
                                <li><a href="">Contáctanos</a></li>
                            </ul>
                        </div>
                        <span className="codigoServicio">Código de servicio</span>
                        <p className="copyright">&copy; 1997-2022 Netflix, Inc.</p>
                    </div>
                </footer>
            )
        }
    }
}

export default Footer;