import React, { Component } from "react";
import axios from "axios";

import Footer from "./Footer";
import Header from "./Header";
import { config } from '../config';
import { Navigate } from "react-router-dom";

class Peliculas extends Component {


    url = config.url;

    state = {
        id: window.location.pathname.split("/")[2],
        series: [],
        status: null
    }

    componentDidMount() {
        this.getUsuario();
        this.getPeliculas();
    }

    getPeliculas = () => {
        axios(this.url + 'peliculas')
            .then(res => {
                this.setState({
                    series: res.data.messsage,
                    status: "true"
                })
            });
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

        if (this.state.series.length >= 1) {

            let lista = this.state.series.map(serie => {
                return (
                    <div className="iconoPeliculas margin-bottom" key={serie._id}>
                        <img src={this.url + "getImage/" + serie.image} alt={serie.title} />
                    </div>
                )
            })

            return (
                <React.Fragment>
                    <Header inicio="true" id={this.state.id} />

                    <main className="mainInicio">
                        <div className="centralNetflix mainMiLista">
                            <div className="row">
                                <h3 className="subTitle">Peliculas</h3>
                                <div className="iconosPrincipales iconosMiLista">
                                    {lista}
                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer inicio="true" />
                </React.Fragment>
            )
        } else if (this.state.series.length == 0 && this.state.status === "true") {
            return (
                <React.Fragment>
                    <Header inicio="true" id={this.state.id} />

                    <main className="mainInicio">
                        <div className="centralNetflix mainMiLista">
                            <div className="row">
                                <h3 className="subTitle">Peliculas</h3>
                                <h3 className="subtituloSinData">Cargando ...</h3>
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
                                <h3 className="subTitle">Peliculas</h3>
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

export default Peliculas;