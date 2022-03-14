import React, { Component } from "react";

import Footer from "./Footer";
import Header from "./Header";

import TvYMas from '../assets/images/tv2.png';
import Tv from '../assets/images/tv.png';
import Movil from '../assets/images/strangers.jpg';
import Infantil from '../assets/images/infantil.png';

class Registro extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="inicioLogin" class="inicioLoginRegister">
                    <Header
                        registro="true"
                    />
                </div>

                <div class="registerLogin">
                    <div class="cardRegister">
                        <div class="textoCardRegister">
                            <h3 class="subheaderLogin">Disfruta de netflix en tu TV.</h3>
                            <p class="subParrafo">Smart TV, Playstation, Xbox, Chromecast, Apple TV, reproductores Blu-ray y muchos más.</p>
                        </div>
                        <div class="imagenCardRegister">
                            <img src={Tv} alt="tv netflix" class="imgRegisterLogin" />
                        </div>
                    </div>
                </div>
                <div class="registerLogin">
                    <div class="cardRegister">
                        <div class="imagenCardRegister">
                            <img src={Movil} alt="Strangers Things" class="imgRegisterLogin" />
                        </div>
                        <div class="textoCardRegister">
                            <h3 class="subheaderLogin">Descárgate tus series favoritas para verlas sin conexión.</h3>
                            <p class="subParrafo">Guarda tus títulos favoritos fácilmente para que siempre tengas algo para ver.</p>
                        </div>
                    </div>
                </div>
                <div class="registerLogin">
                    <div class="cardRegister">
                        <div class="textoCardRegister">
                            <h3 class="subheaderLogin">Disfruta en todas partes.</h3>
                            <p class="subParrafo">Reproduce en streaming todas las películas y series en tu móvil, tableta, ordenador y TV sin pagar más.</p>
                        </div>
                        <div class="imagenCardRegister">
                            <img src={TvYMas} alt="tv netflix" class="imgRegisterLogin" />
                        </div>
                    </div>
                </div>
                <div class="registerLogin" >
                    <div class="cardRegister">
                        <div class="imagenCardRegister">
                            <img src={Infantil} alt="infantil netflix" class="imgRegisterLogin" />
                        </div>
                        <div class="textoCardRegister">
                            <h3 class="subheaderLogin">Crea perfiles infantiles.</h3>
                            <p class="subParrafo">Deja que los niños vivan aventuras con sus personajes favoritos en un espacio diseñado exclusivamente para ellos, gratis con tu suscripción.</p>
                        </div>
                    </div>
                </div>
                <div class="registerLoginPreguntas" id="registerLoginLast">
                    <h2 class="subheaderLogin">Preguntas frecuentes</h2>
                    <ul class="preguntasRegister">
                        <li>¿Qué es Netflix?</li>
                        <div class="respuestaRegister">
                            <p>Netflix es un servicio de streaming que ofrece una amplia variedad de series, películas, títulos de anime, documentales y otros contenidos premiados en miles de dispositivos conectados a internet.</p>
                            <p>Puedes ver todo el contenido que quieras, cuando quieras y sin un solo anuncio por una tarifa mensual reducida. ¡Siempre hay algo nuevo que descubrir, y cada semana se añaden nuevas series y películas!</p>
                        </div>
                        <li>¿Cuánto cuesta Netflix?</li>
                        <div class="respuestaRegister">
                            <p>Disfruta de Netflix en tu smartphone, tableta, Smart TV, ordenador o dispositivo de streaming, todo por una tarifa mensual fija. Planes desde 7,99 € a 17,99 € al mes. Sin cargos adicionales ni contratos.</p>
                        </div>
                        <li>¿Donde puedo ver Netflix?</li>
                        <div class="respuestaRegister">
                            <p>Disfruta donde quieras y cuando quieras. Inicia sesión con tu cuenta de Netflix para disfrutar al instante de todo el contenido de netflix.com desde tu ordenador personal o en cualquier dispositivo conectado a internet que ofrezca la aplicación de Netflix, entre ellos, smart TV, smartphones, tabletas, reproductores multimedia de streaming y consolas de juegos.</p>
                            <p>También puedes descargar tus series favoritas con la aplicación de iOS, Android o Windows 10. Utiliza las descargas para ver títulos dondequiera que vayas y cuando no dispongas de conexión a internet. Netflix siempre te acompaña.</p>
                        </div>
                        <li>¿Cómo cancelo?</li>
                        <div class="respuestaRegister">
                            <p>Netflix es flexible. Sin contratos liosos ni compromisos. Puedes cancelar fácilmente tu cuenta en línea con tan solo dos clics. Sin cargos por cancelación: activa o cancela tu cuenta en cualquier momento.</p>
                        </div>
                        <li>¿Qué puedo ver en Netflix?</li>
                        <div class="respuestaRegister">
                            <p>Netflix dispone de una amplia biblioteca de originales de Netflix galardonados, títulos de anime, series de TV, documentales, largometrajes y otros contenidos. Ve todo el contenido que quieras, cuando quieras.</p>
                        </div>
                        <li>¿Es Netflix bueno para los niños?</li>
                        <div class="respuestaRegister">
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

export default Registro;