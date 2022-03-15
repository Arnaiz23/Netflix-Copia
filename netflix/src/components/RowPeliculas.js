import React, { Component } from "react";
import { config } from "../config";
import axios from "axios";

import imagen from '../assets/images/familiaAlInstante.jpg';

class RowPeliculas extends Component {

    url = config.url;

    state = {
        usuario: "",
        peliculasMiLista: [],
        miLista: []
    }

    componentDidMount() {
        if (this.props.peliculasMiLista) {
            this.setState({
                usuario: this.props.peliculasMiLista
            });
            setTimeout(() => {
                this.getMiLista();
            }, 300);
        }
    }

    getMiLista = () => {
        axios(this.url + 'usuario/' + this.state.usuario)
            .then(res => {
                // console.log(res.data.message.miLista);
                this.setState({
                    miLista: res.data.message.miLista
                });
                this.getPeliculasLista();
            });
    }

    getPeliculasLista = () => {
        this.state.miLista.map(pelicula => {
            axios(this.url + 'pelicula/' + pelicula)
                .then(res => {
                    if (this.state.peliculasMiLista.length == 0) {
                        this.setState({
                            peliculasMiLista: [
                                res.data.message
                            ]
                        });
                    } else {
                        this.setState({
                            peliculasMiLista: [
                                this.state.peliculasMiLista[0],
                                res.data.message
                            ]
                        });
                    }
                });
        });
    }

    render() {

        if (this.state.peliculasMiLista.length >= 1) {

            let miLista = this.state.peliculasMiLista.map(pelicula => {
                return (
                    <div className="iconoPeliculas">
                        <img src={this.url + 'getImage/' + pelicula.image} alt={pelicula.title} />
                    </div>
                )
            });

            return (
                <div className="row">
                    <h3 className="subTitle">
                        {this.props.titulo}
                        <i className="fa-solid fa-angle-right ver-mas"></i>
                        <span className="explorar">
                            Explorar todo
                            <i className="fa-solid fa-angle-right"></i>
                        </span>
                    </h3>
                    <div className="iconosPrincipales">
                        {miLista}
                        {/* <div className="peliculaHover">
                            <img src="./images/familiaAlInstante.jpg" alt="familia al instante" />
                            <div className="peliculaHoverInfo">
                                <div className="peliculaHoverRow">
                                    <div className="optionsHover">
                                        <i className="fa-solid fa-play"></i>
                                        <i className="fa-solid fa-plus"></i>
                                            <i className="fa-solid fa-check"></i>
                                        <i className="fa-solid fa-thumbs-up"></i>
                                        <i className="fa-solid fa-thumbs-down"></i>
                                    </div>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                                <div className="peliculaHoverRow">
                                    <p className="coincidencia">98% de coincidencia</p>
                                    <span className="edad-7">7+</span>
                                    <p className="temporardas">1h 59min</p>
                                    <span className="hd">HD</span>
                                </div>
                                <div className="peliculaHoverRow">
                                    <p className="genero">Irreverente</p>
                                    <p className="genero">Optimista</p>
                                    <p className="genero">Conmovedora</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            )
        } else {
            return (
                <h1>No hay</h1>
            )
        }
    }
}

export default RowPeliculas