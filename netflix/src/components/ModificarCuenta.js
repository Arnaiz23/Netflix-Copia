import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import Footer from './Footer';
import Header from './Header';

class ModificarCuenta extends Component {

    emailRef = React.createRef();
    passwordRef = React.createRef();
    facturacionRef = React.createRef();

    state = {
        id : window.location.pathname.split("/")[2],
        cuenta: {
            email: "",
            password: "",
            facturacion: ""
        },
        redirect : null,
        cuenta2 : {},
        usuarios : []
    }

    componentDidMount(){
        this.getUsuario();
    }

    rellenarData = () => {
        this.setState({
            cuenta: {
                email: this.emailRef.current.value,
                password: this.passwordRef.current.value,
                facturacion: this.facturacionRef.current.value
            }
        });
    }

    getUsuario = () => {
        let token = {
            token: localStorage.getItem("token")
        };

        axios.post(this.url + "cuenta", token)
            .then(res => {
                // console.log(res.data.usuario[0]);
                this.setState({
                    cuenta2: res.data.usuario[0],
                    usuarios: res.data.usuario[0].usuarios
                });
                this.getUsuarios();
            })
            .catch(err => {
                this.setState({
                    redirect: true
                });
            });
    }

    modificar = (e) => {
        e.preventDefault();
        this.rellenarData();
        console.log(this.state.cuenta);
    }

    eliminarCuenta = () => {
        alert("Eliminando...");
    }

    render() {

        if(this.state.redirect) return <Navigate to={'/login'} />
        
        return (
            <React.Fragment>
                <Header inicio="true" id={this.state.id} />
                <main className="mainInicio">
                    <h2>Cuenta</h2>
                    <div className='linea'></div>
                    <form onSubmit={this.modificar} className="formCuenta">
                        <div className='formCuentaCampo'>
                            <label htmlFor='email'>Email</label>
                            <input type="email" placeholder="email" id='email' ref={this.emailRef} onChange={this.rellenarData} />
                        </div>
                        <div className='formCuentaCampo'>
                            <label htmlFor='password'>Contraseña</label>
                            <input type="password" placeholder="password" id='password' ref={this.passwordRef} onChange={this.rellenarData} />
                        </div>
                        <div className='formCuentaCampo'>
                            <label htmlFor='facturacion'>Facturación</label>
                            <input type="text" placeholder="facturacion" id='facturacion' ref={this.facturacionRef} onChange={this.rellenarData} />
                        </div>

                        <input type='submit' value='Confirmar' className='btn btn-success' id='confirmarCuenta' />
                    </form>

                    <div className='linea'></div>
                    <h2 id='eliminarCuenta'>Eliminar cuenta:</h2>
                    <p className='btn btn-danger' id='eliminarCuentaBtn' onClick={this.eliminarCuenta}>Eliminar</p>
                </main>
                <Footer inicio="true" />
            </React.Fragment>
        )
    }
}

export default ModificarCuenta;