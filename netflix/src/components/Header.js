import React, { Component } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import axios from "axios";

import Logo from '../assets/images/Icono.png';
import iconoAlertas from '../assets/images/inicio.jpg';
import iconoCuenta from '../assets/images/iconoCuenta.jpg';
import { config } from '../config';


class Header extends Component {

    searchRef = React.createRef();

    url = config.url;

    state = {
        search: {
            search : "",
            redirect : null
        },
        sesionOff: null,
        volverUsuarios: null,
        cuenta: {},
        usuarios: [],
        usuariosBuenos: [],
        status: null,
        nuevoUsuario : {
            redirect : null,
            usuario : ""
        },
        idUsuario : window.location.pathname.split("/")[2]
    }

    componentDidMount() {
        this.getUsuario();
    }

    getUsuario = () => {
        let token = {
            token: localStorage.getItem("token")
        };

        axios.post(this.url + "cuenta", token)
            .then(res => {
                // console.log(res.data.usuario[0]);
                this.setState({
                    cuenta: res.data.usuario[0],
                    usuarios: res.data.usuario[0].usuarios
                });
                this.getUsuarios();
            })
            .catch(err => {
                /* this.setState({
                    sesionOff: "off"
                }) */
            });
    }

    mostrarAlertas = () => {
        let alertas = document.querySelector(".alertasInfo");
        alertas.classList.toggle("mostrarAlertas");
    }

    rellenarSearch = () => {
        this.setState({
            search: {
                search : this.searchRef.current.value
            }
        });
    }

    mostrarBuscador = () => {
        let search = document.querySelector("#searchInput");
        let searchCaja = document.querySelector(".searchHeaderInput");

        if (searchCaja.classList.contains("searchHeaderHidden")) {
            search.classList.toggle("searchHeaderHidden");
            searchCaja.classList.toggle("searchHeaderHidden");
        }
    }

    buscar = (e) => {
        e.preventDefault();

        this.rellenarSearch();

        this.setState({
            search: {
                search: this.state.search.search,
                redirect : true
            }
        });
        // console.log(this.state);
        /* axios(this.url + 'search-peliculas/' + this.state.search)
            .then(res => {
                this.setState({
                    peliculas: res.data.peliculas
                });
            }); */
    }

    cerrarSesion = () => {
        localStorage.removeItem("token");
        this.setState({
            sesionOff: "off"
        });
    }

    cambiarUsuario = (e) => {
        // console.log(e.currentTarget.id);
        this.setState({
            nuevoUsuario : {
                redirect : true,
                usuario : e.currentTarget.id
            }
        });
    }

    administrarUsuarios = () => {
        this.setState({
            volverUsuarios: "true"
        });
    }

    getUsuarios = () => {
        this.state.usuarios.map(usuario => {
            axios(this.url + 'usuario/' + usuario)
                .then(res => {
                    if (this.state.usuariosBuenos.length == 0) {
                        this.setState({
                            usuariosBuenos: [
                                res.data.message
                            ]
                        });
                    } else {
                        let usuarios = this.state.usuariosBuenos;
                        usuarios.push(res.data.message);

                        this.setState({
                            usuariosBuenos: usuarios
                        });
                    }

                });
        });
    }

    render() {

        if(this.state.search.redirect) return <Navigate to={'/redirectSearch/' + this.state.idUsuario + '/' + this.state.search.search} />

        if(this.state.nuevoUsuario.redirect) return <Navigate to={'/redirectUsuario/' + this.state.nuevoUsuario.usuario} />

        if (this.state.usuariosBuenos.length >= 1) {
            var usuarios = this.state.usuariosBuenos.map(usuario => {
                return (
                    <div className="cuentaNav" key={usuario._id} id={usuario._id} onClick={this.cambiarUsuario}>
                        <img src={iconoCuenta} alt="icono cuenta netflix" className="icono-small" />
                        <p>{usuario.nombre}</p>
                    </div>
                )
            });
        }

        if (this.state.sesionOff === "off") return <Navigate to={'/login'} />

        if (this.state.volverUsuarios === "true") return <Navigate to={'/cuentas'} />

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
                                <li><NavLink to={'/inicio/' + this.props.id} >Inicio</NavLink></li>
                                <li><NavLink to={'/series/' + this.props.id}>Series TV</NavLink></li>
                                <li><NavLink to={'/peliculas/' + this.props.id}>Peliculas</NavLink></li>
                                <li><a href="">Novedades más vistas</a></li>
                                <li><NavLink to={'/miLista/' + this.props.id}>Mi lista</NavLink></li>
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
                        <div className="searchHeader" onClick={this.mostrarBuscador}>
                            <i className="fa-solid fa-magnifying-glass" id="searchInput"></i>
                            <span className="searchHeaderInput searchHeaderHidden">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <form onSubmit={this.buscar}>
                                    <input type="text" id="buscarHeader" placeholder="Títulos, personas, género..." ref={this.searchRef} onChange={this.rellenarSearch} />
                                </form>
                            </span>
                        </div>

                        <span id="menuAlertas" onClick={this.mostrarAlertas}>
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
                        </span>
                        <span className="menuCuentaHeader">
                            <img src={iconoCuenta} alt="icono cuenta netflix" className="icono-small" />
                            <i className="fa-solid fa-angle-down"></i>
                            <div className="menuCuentaHeaderInfo">
                                {usuarios}
                                <div className="cuentaNav" onClick={this.administrarUsuarios}>
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
                                <div className="cuentaNav" onClick={this.cerrarSesion}>
                                    <p>Cerrar sesión en Netflix</p>
                                </div>
                            </div>
                        </span>
                    </div>
                </header>
            )
        }
    }
}

export default Header;