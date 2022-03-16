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
        status: null,
        miLista: []
    }

    componentDidMount() {
        this.getUsuario();
        this.getPeliculas();
        this.getMiLista();
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

    getMiLista = () => {
        axios(this.url + 'usuario/' + this.state.id)
            .then(res => {
                // console.log(res.data.message.miLista);
                this.setState({
                    miLista: res.data.message.miLista
                });
            });
    }

    addMiLista = (e) => {
        // alert("añadir");

        let miLista = this.state.miLista;
        miLista.push(e.target.id);

        let data = {
            "miLista": miLista
        };

        axios.put(this.url + 'usuario/' + this.state.id, data)
            .then(res => {
                // console.log(res.data);
                let add = e.target;
                let quitar = e.target.nextElementSibling;

                add.classList.toggle("miListaShow");
                quitar.classList.toggle("miListaShow");
                this.setState({
                    redirectSerie: true
                });
            })
            .catch(err => { });
    }

    quitarMiLista = (e) => {
        // alert("quitar");
        let miLista = this.state.miLista;
        miLista.splice(miLista.indexOf(e.target.id), 1);

        let data = {
            "miLista": miLista
        };

        axios.put(this.url + 'usuario/' + this.state.id, data)
            .then(res => {
                let add = e.target;
                let quitar = e.target.previousElementSibling;

                add.classList.toggle("miListaShow");
                quitar.classList.toggle("miListaShow");
                this.setState({
                    redirectSerie: true
                });
            })
            .catch(err => { });


    }

    render() {

        if (this.state.redirect) return <Navigate to={'/login'} />

        if (this.state.redirectSerie) return <Navigate to={'/redirectPeliculas/'+this.state.id} />

        if (this.state.series.length >= 1) {

            let lista = this.state.series.map(serie => {
                return (
                    <div className="iconoPeliculas margin-bottom" key={serie._id}>
                        <img src={this.url + "getImage/" + serie.image} alt={serie.title} />
                        <div className="peliculaHover">
                            <img src={this.url + 'getImage/' + serie.image} alt="familia al instante" />
                            <div className="peliculaHoverInfo">
                                <div className="peliculaHoverRow">
                                    <div className="optionsHover">
                                        <i className="fa-solid fa-play"></i>
                                        {/* <i className="fa-solid fa-plus miLista" title="Añadir a Mi Lista" onClick={this.addMiLista}></i>
                                            <i className="fa-solid fa-check miLista miListaShow" title="Quitar de Mi Lista" onClick={this.quitarMiLista}></i> */}
                                        {this.state.miLista.includes(serie._id) ?
                                            (
                                                <React.Fragment>
                                                    <i className="fa-solid fa-plus miLista" title="Añadir a Mi Lista" onClick={this.addMiLista} id={serie._id}></i>
                                                    <i className="fa-solid fa-check miLista miListaShow" title="Quitar de Mi Lista" onClick={this.quitarMiLista} id={serie._id}></i>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    <i className="fa-solid fa-plus miLista miListaShow" title="Añadir a Mi Lista" onClick={this.addMiLista} id={serie._id}></i>
                                                    <i className="fa-solid fa-check miLista" title="Quitar de Mi Lista" onClick={this.quitarMiLista} id={serie._id}></i>
                                                </React.Fragment>
                                            )
                                        }
                                        <i className="fa-solid fa-thumbs-up" title="Dar me gusta"></i>
                                        <i className="fa-solid fa-thumbs-down" title="Dar dislike"></i>
                                    </div>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                                <div className="peliculaHoverRow">
                                    <p className="coincidencia">98% de coincidencia</p>
                                    <span className={"edad-" + serie.edad}>{serie.edad}+</span>
                                    <p className="temporardas">{serie.duracion}</p>
                                    <span className="hd">HD</span>
                                </div>
                                <div className="peliculaHoverRow">
                                    <p className="genero">{serie.generos[0]}</p>
                                    <p className="genero">{serie.generos[1]}</p>
                                    <p className="genero">{serie.generos[2]}</p>
                                </div>
                            </div>
                        </div>
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