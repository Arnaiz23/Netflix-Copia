import React, { Component } from "react";

import Header from "./Header";

import iconoCuenta from '../assets/images/iconoCuenta.jpg';

class Cuentas extends Component {
    render() {
        return (
            <React.Fragment>
                <Header login="true" />

                <main className="mainCuenta">
                    <h2>¿Quién eres? Elige tu perfil</h2>
                    <div className="cuentas">
                        <div className="cuenta">
                            <img src={iconoCuenta} alt="icono cuenta netflix" className="icon-cuenta" />
                                <h3 className="cuentaNombre">Adrián</h3>
                        </div>
                        <div className="cuenta">
                            <img src={iconoCuenta} alt="icono cuenta netflix" className="icon-cuenta" />
                                <h3 className="cuentaNombre">Adrián</h3>
                        </div>
                        <div className="cuenta">
                            <img src={iconoCuenta} alt="icono cuenta netflix" className="icon-cuenta" />
                                <h3 className="cuentaNombre">Adrián</h3>
                        </div>
                        <div className="cuenta">
                            <i className="fa-solid fa-circle-plus" id="addPerfil"></i>
                            <h3 className="cuentaNombre">Añadir perfil</h3>
                        </div>
                    </div>
                    <a href="" className="btn btn-transparent" id="administrarCuentas">Administrar perfiles</a>
                </main>
            </React.Fragment>
        )
    }
}

export default Cuentas;