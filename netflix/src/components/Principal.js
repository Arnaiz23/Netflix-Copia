import React, { Component } from "react";

import Footer from "./Footer";
import Header from "./Header";

import TvYMas from '../assets/images/tv2.png';
import Tv from '../assets/images/tv.png';
import Movil from '../assets/images/strangers.jpg';
import Infantil from '../assets/images/infantil.png';

class Principal extends Component {

    mostrarRespuesta = (e) => {
        let respuesta = e.target.nextElementSibling;
        respuesta.classList.toggle("respuestaRegisterOn");
    }
    
    render() {
        return (
            <React.Fragment>
                <div id="inicioLogin" className="inicioLoginRegister">
                    <Header
                        registro="true"
                    />
                </div>

                <div className="registerLogin">
                    <div className="cardRegister">
                        <div className="textoCardRegister">
                            <h3 className="subheaderLogin">Disfruta de netflix en tu TV.</h3>
                            <p className="subParrafo">Smart TV, Playstation, Xbox, Chromecast, Apple TV, reproductores Blu-ray y muchos más.</p>
                        </div>
                        <div className="imagenCardRegister">
                            <img src={Tv} alt="tv netflix" className="imgRegisterLogin" />
                        </div>
                    </div>
                </div>
                <div className="registerLogin">
                    <div className="cardRegister">
                        <div className="imagenCardRegister">
                            <img src={Movil} alt="Strangers Things" className="imgRegisterLogin" />
                        </div>
                        <div className="textoCardRegister">
                            <h3 className="subheaderLogin">Descárgate tus series favoritas para verlas sin conexión.</h3>
                            <p className="subParrafo">Guarda tus títulos favoritos fácilmente para que siempre tengas algo para ver.</p>
                        </div>
                    </div>
                </div>
                <div className="registerLogin">
                    <div className="cardRegister">
                        <div className="textoCardRegister">
                            <h3 className="subheaderLogin">Disfruta en todas partes.</h3>
                            <p className="subParrafo">Reproduce en streaming todas las películas y series en tu móvil, tableta, ordenador y TV sin pagar más.</p>
                        </div>
                        <div className="imagenCardRegister">
                            <img src={TvYMas} alt="tv netflix" className="imgRegisterLogin" />
                        </div>
                    </div>
                </div>
                <div className="registerLogin" >
                    <div className="cardRegister">
                        <div className="imagenCardRegister">
                            <img src={Infantil} alt="infantil netflix" className="imgRegisterLogin" />
                        </div>
                        <div className="textoCardRegister">
                            <h3 className="subheaderLogin">Crea perfiles infantiles.</h3>
                            <p className="subParrafo">Deja que los niños vivan aventuras con sus personajes favoritos en un espacio diseñado exclusivamente para ellos, gratis con tu suscripción.</p>
                        </div>
                    </div>
                </div>
                <div className="registerLoginPreguntas" id="registerLoginLast">
                    <h2 className="subheaderLogin">Preguntas frecuentes</h2>
                    <ul className="preguntasRegister">
                        <li onClick={this.mostrarRespuesta}>¿Qué es Netflix?</li>
                        <div className="respuestaRegister">
                            <p>Netflix es un servicio de streaming que ofrece una amplia variedad de series, películas, títulos de anime, documentales y otros contenidos premiados en miles de dispositivos conectados a internet.</p>
                            <p>Puedes ver todo el contenido que quieras, cuando quieras y sin un solo anuncio por una tarifa mensual reducida. ¡Siempre hay algo nuevo que descubrir, y cada semana se añaden nuevas series y películas!</p>
                        </div>
                        <li onClick={this.mostrarRespuesta}>¿Cuánto cuesta Netflix?</li>
                        <div className="respuestaRegister">
                            <p>Disfruta de Netflix en tu smartphone, tableta, Smart TV, ordenador o dispositivo de streaming, todo por una tarifa mensual fija. Planes desde 7,99 € a 17,99 € al mes. Sin cargos adicionales ni contratos.</p>
                        </div>
                        <li onClick={this.mostrarRespuesta}>¿Donde puedo ver Netflix?</li>
                        <div className="respuestaRegister">
                            <p>Disfruta donde quieras y cuando quieras. Inicia sesión con tu cuenta de Netflix para disfrutar al instante de todo el contenido de netflix.com desde tu ordenador personal o en cualquier dispositivo conectado a internet que ofrezca la aplicación de Netflix, entre ellos, smart TV, smartphones, tabletas, reproductores multimedia de streaming y consolas de juegos.</p>
                            <p>También puedes descargar tus series favoritas con la aplicación de iOS, Android o Windows 10. Utiliza las descargas para ver títulos dondequiera que vayas y cuando no dispongas de conexión a internet. Netflix siempre te acompaña.</p>
                        </div>
                        <li onClick={this.mostrarRespuesta}>¿Cómo cancelo?</li>
                        <div className="respuestaRegister">
                            <p>Netflix es flexible. Sin contratos liosos ni compromisos. Puedes cancelar fácilmente tu cuenta en línea con tan solo dos clics. Sin cargos por cancelación: activa o cancela tu cuenta en cualquier momento.</p>
                        </div>
                        <li onClick={this.mostrarRespuesta}>¿Qué puedo ver en Netflix?</li>
                        <div className="respuestaRegister">
                            <p>Netflix dispone de una amplia biblioteca de originales de Netflix galardonados, títulos de anime, series de TV, documentales, largometrajes y otros contenidos. Ve todo el contenido que quieras, cuando quieras.</p>
                        </div>
                        <li onClick={this.mostrarRespuesta}>¿Es Netflix bueno para los niños?</li>
                        <div className="respuestaRegister">
                            <p>La experiencia infantil de Netflix se incluye en la suscripción para que los padres tengan el control mientras los niños disfrutan de series y películas familiares en su propio espacio.</p>
                            <p>Los perfiles infantiles incluyen controles parentales protegidos por PIN que te permiten restringir la calificación por edades del contenido que pueden ver los niños y bloquear determinados títulos que no quieras que vean.</p>
                        </div>
                    </ul>
                </div>

                <Footer registro="true" />
            </React.Fragment>
        )
    }
}

export default Principal;