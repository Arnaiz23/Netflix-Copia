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
        status: null,
        miLista : []
    }

    componentDidMount() {
        this.getUsuario();
        this.getMiLista();
    }

    getMiLista = () => {
        axios(this.url + 'usuario/' + this.state.id)
            .then(res => {
                this.setState({
                    miLista: res.data.message.miLista
                });
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

    /* addMiLista = (e) => {
        // alert("añadir");

        let miLista = this.state.miLista;
        miLista.push(e.target.id);
        
        let data = {
            "miLista" : miLista
        };
        
        axios.put(this.url + 'usuario/' + this.state.cuenta._id, data)
            .then(res =>{
                console.log(res.data);
            })
            .catch(err =>{});

        let add = e.target;
        let quitar = e.target.nextElementSibling;

        add.classList.toggle("miListaShow");
        quitar.classList.toggle("miListaShow");

        this.setState({
            redirect: true
        })
    } */

    quitarMiLista = (e) => {
        // alert("quitar");
        let miLista = this.state.miLista;
        miLista.splice(miLista.indexOf(e.target.id),1);
        
        let data = {
            "miLista" : miLista
        };
        
        axios.put(this.url + 'usuario/' + this.state.id, data)
            .then(res =>{
                this.setState({
                    redirectLista: true
                });
            })
            .catch(err =>{});
        
        let add = e.target;
        let quitar = e.target.previousElementSibling;

        add.classList.toggle("miListaShow");
        quitar.classList.toggle("miListaShow");
    }

    render() {

        if (this.state.redirect) return <Navigate to={'/login'} />

        if (this.state.redirectLista) return <Navigate to={'/redirectMiLista/'+this.state.id} />

        if (this.state.peliculasMiLista.length >= 1) {
            let lista = this.state.peliculasMiLista.map(pelicula => {
                return (
                    <div className="iconoPeliculas margin-bottom" key={pelicula._id}>
                        <img src={this.url + "getImage/" + pelicula.image} alt={pelicula.title} />
                        <div className="peliculaHover">
                            <img src={this.url + 'getImage/' + pelicula.image} alt="familia al instante" />
                            <div className="peliculaHoverInfo">
                                <div className="peliculaHoverRow">
                                    <div className="optionsHover">
                                        <i className="fa-solid fa-play"></i>
                                        <i className="fa-solid fa-plus miLista" title="Añadir a Mi Lista"></i>
                                        <i className="fa-solid fa-check miLista miListaShow" title="Quitar de Mi Lista" onClick={this.quitarMiLista} id={pelicula._id}></i>
                                        <i className="fa-solid fa-thumbs-up" title="Dar me gusta"></i>
                                        <i className="fa-solid fa-thumbs-down" title="Dar dislike"></i>
                                    </div>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                                <div className="peliculaHoverRow">
                                    <p className="coincidencia">98% de coincidencia</p>
                                    <span className={"edad-" + pelicula.edad}>{pelicula.edad}+</span>
                                    <p className="temporardas">{pelicula.duracion}</p>
                                    <span className="hd">HD</span>
                                </div>
                                <div className="peliculaHoverRow">
                                    <p className="genero">{pelicula.generos[0]}</p>
                                    <p className="genero">{pelicula.generos[1]}</p>
                                    <p className="genero">{pelicula.generos[2]}</p>
                                </div>
                            </div>
                        </div>
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