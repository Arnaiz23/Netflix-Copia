import React, { Component } from "react";

import imagen from '../assets/images/familiaAlInstante.jpg';

class RowPeliculas extends Component {
    render() {
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
                    <div className="iconoPeliculas">
                        <img src={imagen} alt="familia al instante pelicula" />
                        {this.props.progress && <progress class="progress" max="100" value="50"></progress>}
                    </div>
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
                    <div className="iconoPeliculas">
                        <img src={imagen} alt="familia al instante pelicula" />
                        {this.props.progress && <progress class="progress" max="100" value="50"></progress>}
                    </div>
                    <div className="iconoPeliculas">
                        <img src={imagen} alt="familia al instante pelicula" />
                        {this.props.progress && <progress class="progress" max="100" value="50"></progress>}
                    </div>
                </div>
            </div>
        )
    }
}

export default RowPeliculas