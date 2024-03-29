import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import {config}  from '../config';
import Header from "./Header";
import Footer from "./Footer";

class Search extends Component {

    url = config.url;

    state = {
        id: window.location.pathname.split("/")[2],
        search : window.location.pathname.split("/")[3],
        peliculas: [],
        status: null
    }

    componentDidMount() {
        this.getUsuario();
        this.getPeliculas();
    }

    getUsuario = () => {
        let token = {
            token: localStorage.getItem("token")
        };

        axios.post(this.url + "cuenta", token)
            .then(res => {
                // console.log(res.data.usuario[0]);
                this.setState({
                    cuenta: res.data.usuario[0]
                });
            })
            .catch(err => {
                this.setState({
                    redirect: true
                })
            })
    }

    getPeliculas = () => {
        axios(this.url + 'search-peliculas/' + this.state.search)
            .then(res => {
                this.setState({
                    peliculas: res.data.peliculas
                });
            });
    }

    render() {

        if (this.state.redirect) return <Navigate to={'/login'} />

        if (this.state.peliculas.length >= 1) {
            let lista = this.state.peliculas.map(pelicula => {
                return (
                    <div className="iconoPeliculas margin-bottom" key={pelicula._id}>
                        <img src={this.url + "getImage/" + pelicula.image} alt={pelicula.title} />
                    </div>
                )
            });
            return (
                <React.Fragment>
                    <Header inicio="true" id={this.state.id} />

                    <main className="mainInicio">
                        <div className="centralNetflix mainMiLista">
                            <div className="row">
                                <h3 className="subTitle">Buscador: {this.state.search}</h3>
                                <div className="iconosPrincipales iconosMiLista">
                                    {lista}
                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer inicio="true" />
                </React.Fragment>
            )
        } else if (this.state.peliculas.length == 0 && this.state.status === "true") {
            return (
                <React.Fragment>
                    <Header inicio="true" id={this.state.id} />

                    <main className="mainInicio">
                        <div className="centralNetflix mainMiLista">
                            <div className="row">
                                <h3 className="subTitle">Mi lista</h3>
                                <h3 className="subtituloSinData">Actualmente no hay peliculas / series en tu lista</h3>
                            </div>
                        </div>
                    </main>

                    <Footer inicio="true" />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Header inicio="true" id={this.state.id} />

                    <main className="mainInicio">
                        <div className="centralNetflix mainMiLista">
                            <div className="row">
                                <h3 className="subTitle">Mi lista</h3>
                                <h3 className="subtituloSinData">Cargando ...</h3>
                            </div>
                        </div>
                    </main>

                    <Footer inicio="true" />
                </React.Fragment>
            )
        }

    }

}


export default Search;