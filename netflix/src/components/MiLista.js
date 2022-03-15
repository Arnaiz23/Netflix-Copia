import React, { Component } from "react";
import axios from "axios";

import Footer from "./Footer";
import Header from "./Header";
import { config } from '../config';
import { Navigate } from "react-router-dom";

class MiLista extends Component {

    url = config.url;

    state = {
        id: window.location.pathname.split("/")[2],
        peliculasMiLista: [],
        status: null
    }

    componentDidMount() {
        this.getUsuario();
        this.getMiLista();
    }

    getMiLista = () => {
        axios(this.url + 'usuario/' + this.state.id)
            .then(res => {
                let peliculas = res.data.message.miLista;
                this.setState({
                    status: "waiting"
                });
                if (peliculas.length == 0) {
                    this.setState({
                        status: "true"
                    });
                }
                peliculas.map(pelicula => {
                    axios(this.url + 'pelicula/' + pelicula)
                        .then(res => {
                            if (this.state.peliculasMiLista.length == 0) {
                                this.setState({
                                    peliculasMiLista: [
                                        res.data.message
                                    ]
                                });
                            } else {
                                let peliculas = this.state.peliculasMiLista;
                                peliculas.push(res.data.message);

                                this.setState({
                                    peliculasMiLista: peliculas
                                });
                            }
                            this.setState({
                                status: "true"
                            })
                        });
                });
            })
    }

    getUsuario = () => {
        let token = {
            token : localStorage.getItem("token")
        };

        axios.post(this.url + "cuenta",token)
            .then(res => {
                // console.log(res.data.usuario[0]);
                this.setState({
                    cuenta : res.data.usuario[0]
                });
            })
            .catch(err => {
                this.setState({
                    redirect : true
                })
            })
    }

    render() {

        if(this.state.redirect) return <Navigate to={'/login'} />

        if (this.state.peliculasMiLista.length >= 1) {
            let lista = this.state.peliculasMiLista.map(pelicula => {
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
                                <h3 className="subTitle">Mi lista</h3>
                                <div className="iconosPrincipales iconosMiLista">
                                    {lista}
                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer inicio="true" />
                </React.Fragment>
            )
        } else if (this.state.peliculasMiLista.length == 0 && this.state.status === "true") {
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

export default MiLista;