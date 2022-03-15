import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from '../assets/images/Icono.png';
import iconoAlertas from '../assets/images/inicio.jpg';
import iconoCuenta from '../assets/images/iconoCuenta.jpg';

class Header extends Component {
    render() {
        if (this.props.registro === "true") {
            return (
                <div id="inicioLoginOscuro">
                    <header id="inicioHeader">
                        <img src={Logo} alt="icono netflix" className="iconoN" />
                        <div className="headerDerecha">
                            <div className="icon-world" id="icon-world-header">
                                <select className="inicioIdioma">
                                    <option value="spa">Español</option>
                                    <option value="eng">English</option>
                                </select>
                            </div>
                            <Link to={'/login'} className="btn btn-danger" id="btn-login">Iniciar sesión</Link>
                        </div>
                    </header>
                    <div id="inicioMain" className="inicioMainLogin">
                        <div className="centerLogin">
                            <h2>Todas las películas y series que desees, y mucho más.</h2>
                            <p className="loginSubtitle">Disfruta donde quieras. Cancela cuando quieras.</p>
                            <p className="loginSubSubtitle">¿Quieres ver algo ya? Escribe tu correo para crear una suscripción a
                                Netflix o reactivarla.</p>
                            <div className="RegisterForm">
                                <input type="text" name="" id="" placeholder="Correo electrónico" className="inputRegister" />
                                <input type="submit" value="Empezar >" className="btn btn-danger" id="loginRegisterInput" />
                            </div>
                        </div>
                    </div>

                </div>
            )
        }

        if (this.props.login === "true") {
            return (
                <header id="inicioHeader">
                    <img src={Logo} alt="icono netflix" className="iconoN" />
                </header>
            )
        }

        if (this.props.inicio === "true") {
            return (
                <header id="inicioHeader" className="inicioHeaderHome">
                    <div className="inicioHeaderLeft">
                        <img src={Logo} alt="icono netflix" className="iconoN iconoN-small" />
                        <nav className="navbar">
                            <ul>
                                <li><Link to={'/inicio'} className="optionActive">Inicio</Link></li>
                                <li><a href="">Series TV</a></li>
                                <li><a href="">Peliculas</a></li>
                                <li><a href="">Novedades más vistas</a></li>
                                <li><a href="milista.html">Mi lista</a></li>
                            </ul>
                        </nav>
                        <nav className="navbarResponsive">
                            <ul>
                                <li>
                                    <p>Menu <i className="fa-solid fa-caret-down"></i></p>
                                    <ul className="navResponsive">
                                        <li><a href="" className="optionActive">Inicio</a></li>
                                        <li><a href="">Series TV</a></li>
                                        <li><a href="">Peliculas</a></li>
                                        <li><a href="">Novedades más vistas</a></li>
                                        <li><a href="">Mi lista</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="inicioHeaderRight">
                        <div className="searchHeader">
                            <i className="fa-solid fa-magnifying-glass" id="searchInput"></i>
                            <span className="searchHeaderInput searchHeaderHidden">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <input type="text" id="buscarHeader" placeholder="Títulos, personas, género..." />
                            </span>
                        </div>

                        <i className="fa-solid fa-bell" id="icon-alerta">
                            <span className="badge">2</span>
                        </i>
                        <div className="alertasInfo">
                            <div className="alerta">
                                <img src={iconoAlertas} alt="icono serie netflix" className="alerta-small" />
                                <div>
                                    <p>Recordatorio: nueva temporada. Ya puedes ver la 5 temporada</p>
                                    <p className="fechaAlerta">hace 4 días</p>
                                </div>
                            </div>
                            <div className="lineaNav"></div>
                            <div className="alerta">
                                <img src={iconoAlertas} alt="icono serie netflix" className="alerta-small" />
                                <div>
                                    <p>Recordatorio: nueva temporada. Ya puedes ver la 5 temporada</p>
                                    <p className="fechaAlerta">hace 4 días</p>
                                </div>
                            </div>
                        </div>
                        <span className="menuCuentaHeader">
                            <img src={iconoCuenta} alt="icono cuenta netflix" className="icono-small" />
                            <i className="fa-solid fa-angle-down"></i>
                        </span>
                        <div className="menuCuentaHeaderInfo">
                            <div className="cuentaNav">
                                <img src={iconoCuenta} alt="icono cuenta netflix" className="icono-small" />
                                <p>Adrian</p>
                            </div>
                            <div className="cuentaNav">
                                <img src={iconoCuenta} alt="icono cuenta netflix" className="icono-small" />
                                <p>Adrian</p>
                            </div>
                            <div className="cuentaNav">
                                <i className="fa-solid fa-pen icono-small"></i>
                                <p>Administrar perfiles</p>
                            </div>
                            <div className="lineaNav"></div>
                            <div className="cuentaNav">
                                <i className="fa-solid fa-user icono-small"></i>
                                <p>Cuenta</p>
                            </div>
                            <div className="cuentaNav">
                                <i className="fa-solid fa-circle-question icono-small"></i>
                                <p>Centro de ayuda</p>
                            </div>
                            <div className="lineaNav"></div>
                            <div className="cuentaNav">
                                <p>Cerrar sesión en Netflix</p>
                            </div>
                        </div>
                    </div>
                </header>
            )
        }
    }
}

export default Header;