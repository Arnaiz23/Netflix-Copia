import React, { Component } from "react";
import { config } from "../config";
import axios from "axios";
import { Navigate } from "react-router-dom";


class RowPeliculas extends Component {

    url = config.url;

    state = {
        usuario: "",
        peliculasMiLista: [],
        miLista: [],
        peliculas: [],
        redirect: null
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
        if (this.props.series) {
            this.getPeliculas();
        }
        if (this.props.miLista) {
            this.setState({
                usuario: this.props.miLista
            });
            setTimeout(() => {
                this.getMiListaSolo();
            }, 300);
        }
    }

    getMiListaSolo = () => {
        axios(this.url + 'usuario/' + this.state.usuario)
            .then(res => {
                // console.log(res.data.message.miLista);
                this.setState({
                    miLista: res.data.message.miLista
                });
            });
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
                        let peliculas = this.state.peliculasMiLista;
                        peliculas.push(res.data.message);

                        this.setState({
                            peliculasMiLista: peliculas
                        });
                    }
                });
        });
    }

    getPeliculas = () => {
        if (this.props.pelicula) {
            axios(this.url + 'peliculasTipo/pelicula')
                .then(res => {
                    // console.log(res.data.messsage);
                    this.setState({
                        peliculas: res.data.message
                    });
                });
        } else {
            axios(this.url + 'peliculasTipo/serie')
                .then(res => {
                    // console.log(res.data.messsage);
                    this.setState({
                        peliculas: res.data.message
                    });
                });
        }

    }

    addMiLista = (e) => {
        // alert("añadir");

        let miLista = this.state.miLista;
        miLista.push(e.target.id);

        let data = {
            "miLista": miLista
        };

        axios.put(this.url + 'usuario/' + this.state.usuario, data)
            .then(res => {
                // console.log(res.data);
                this.setState({
                    redirect: true
                });
            })
            .catch(err => { });

        let add = e.target;
        let quitar = e.target.nextElementSibling;

        add.classList.toggle("miListaShow");
        quitar.classList.toggle("miListaShow");
    }

    quitarMiLista = (e) => {
        // alert("quitar");
        let miLista = this.state.miLista;
        miLista.splice(miLista.indexOf(e.target.id), 1);

        let data = {
            "miLista": miLista
        };

        axios.put(this.url + 'usuario/' + this.state.usuario, data)
            .then(res => {
                this.setState({
                    redirect: true
                });
            })
            .catch(err => { });

        let add = e.target;
        let quitar = e.target.previousElementSibling;

        add.classList.toggle("miListaShow");
        quitar.classList.toggle("miListaShow");


    }

    desplazarIzquierda = (e) => {
        // ! https://code.tutsplus.com/es/tutorials/create-the-perfect-carousel-part-1--cms-29481
        const fila = e.target.nextElementSibling;

        // const distancia = fila.scrollLeft;

        // fila.style.transform = `translateX(${distancia}px)`;
        // fila.style.transform = `translateX(0vw)`;
        const {left} = fila.getBoundingClientRect();
        let resultado = left + 1600;

        if(resultado > 5){
            resultado = 5;
        }

        fila.style.transform = `translateX(${resultado}px)`;
    }

    desplazarDerecha = (e) => {
        const fila = e.target.previousElementSibling;

        /* const distancia = -fila.offsetWidth;

        fila.style.transform = `translateX(${distancia}px)`; */
        // fila.style.transform = `translateX(-90vw)`;
        const {left} = fila.getBoundingClientRect();
        let resultado = left - 1600;

        if(resultado < -2939){
            resultado = -2939;
        }

        fila.style.transform = `translateX(${resultado}px)`;
    }

    render() {

        if (this.state.redirect) return <Navigate to={'/redirectUsuario/' + this.state.usuario} />

        if (this.props.peliculasMiLista) {

            if (this.state.peliculasMiLista.length >= 1) {

                let miLista = [];

                if (this.props.progress) {
                    let lista = this.state.peliculasMiLista.slice(0, 2);
                    miLista = lista.map(pelicula => {
                        return (
                            <div className="iconoPeliculas" key={pelicula._id} id={pelicula._id}>
                                <img src={this.url + 'getImage/' + pelicula.image} alt={pelicula.title} />
                                <progress className="progress" max="100" value="50"></progress>
                            </div>
                        )
                    });
                } else {
                    miLista = this.state.peliculasMiLista.map(pelicula => {
                        return (
                            <div className="iconoPeliculas" key={pelicula._id} id={pelicula._id}>
                                <img src={this.url + 'getImage/' + pelicula.image} alt={pelicula.title} />
                                <div className="peliculaHover">
                                    <img src={this.url + 'getImage/' + pelicula.image} alt="familia al instante" />
                                    <div className="peliculaHoverInfo">
                                        <div className="peliculaHoverRow">
                                            <div className="optionsHover">
                                                <i className="fa-solid fa-play"></i>
                                                <i className="fa-solid fa-plus miLista" title="Añadir a Mi Lista" onClick={this.addMiLista} id={pelicula._id}></i>
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
                }

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
                            {this.props.progress ?
                                (
                                    <div className="carouselContainer">
                                        <div className="carousel">
                                            {miLista}
                                        </div>
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        <button className="flecha-izquierda" onClick={this.desplazarIzquierda}>
                                            <i className="fa-solid fa-angle-left"></i>
                                        </button>
                                        <div className="carouselContainer">
                                            <div className="carousel">
                                                {miLista}
                                            </div>
                                        </div>
                                        <button className="flecha-derecha" onClick={this.desplazarDerecha}>
                                            <i className="fa-solid fa-angle-right"></i>
                                        </button>
                                    </React.Fragment>
                                )
                            }

                        </div>
                    </div>
                )
            } else {
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
                        <h4 className="subtituloSinData">Actualmente no hay ninguna pelicula / serie</h4>
                    </div>
                )
            }
        } else if (this.props.series) {
            if (this.state.peliculas.length >= 1) {

                let miLista = this.state.peliculas.map(pelicula => {

                    return (
                        <div className="iconoPeliculas" key={pelicula._id} id={pelicula._id}>
                            <img src={this.url + 'getImage/' + pelicula.image} alt={pelicula.title} />
                            <div className="peliculaHover">
                                <img src={this.url + 'getImage/' + pelicula.image} alt="familia al instante" />
                                <div className="peliculaHoverInfo">
                                    <div className="peliculaHoverRow">
                                        <div className="optionsHover">
                                            <i className="fa-solid fa-play"></i>
                                            {/* <i className="fa-solid fa-plus miLista" title="Añadir a Mi Lista" onClick={this.addMiLista}></i>
                                            <i className="fa-solid fa-check miLista miListaShow" title="Quitar de Mi Lista" onClick={this.quitarMiLista}></i> */}
                                            {this.state.miLista.includes(pelicula._id) ?
                                                (
                                                    <React.Fragment>
                                                        <i className="fa-solid fa-plus miLista" title="Añadir a Mi Lista" onClick={this.addMiLista} id={pelicula._id}></i>
                                                        <i className="fa-solid fa-check miLista miListaShow" title="Quitar de Mi Lista" onClick={this.quitarMiLista} id={pelicula._id}></i>
                                                    </React.Fragment>
                                                ) : (
                                                    <React.Fragment>
                                                        <i className="fa-solid fa-plus miLista miListaShow" title="Añadir a Mi Lista" onClick={this.addMiLista} id={pelicula._id}></i>
                                                        <i className="fa-solid fa-check miLista" title="Quitar de Mi Lista" onClick={this.quitarMiLista} id={pelicula._id}></i>
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
                            <button className="flecha-izquierda" onClick={this.desplazarIzquierda}>
                                <i className="fa-solid fa-angle-left"></i>
                            </button>
                            <div className="carouselContainer">
                                <div className="carousel">
                                    {miLista}
                                </div>
                            </div>
                            <button className="flecha-derecha" onClick={this.desplazarDerecha}>
                                <i className="fa-solid fa-angle-right"></i>
                            </button>
                        </div>
                    </div>
                )
            } else {
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
                        <h4 className="subtituloSinData">Actualmente no hay ninguna pelicula / serie</h4>
                    </div>
                )
            }
        } else {
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
                    <h4 className="subtituloSinData">Actualmente no hay ninguna pelicula / serie</h4>
                </div>
            )
        }
    }
}

export default RowPeliculas