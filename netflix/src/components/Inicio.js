import React, {Component} from "react";
import axios from 'axios';

import Footer from "./Footer";
import Header from "./Header";
import RowPeliculas from "./RowPeliculas";
import Slider from "./Slider";
import {config} from '../config';
import { Navigate } from "react-router";

class Inicio extends Component{

    url = config.url;

    state = {
        redirect: null,
        cuenta : {},
        usuario : null,
        miLista : [],
        peliculasMiLista : []
    }

    componentDidMount(){
        this.getUsuario();
        this.setState({
            usuario: window.location.pathname.split("/")[2]
        });
        // ! Ahora tengo tanto los datos de la cuenta actual como del usuario
        setTimeout(()=>{
            this.getMiLista();
        }, 200);
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

    getMiLista = () => {
        axios(this.url + 'usuario/'+this.state.usuario)
            .then(res => {
                // console.log(res.data.message.miLista);
                this.setState({
                    miLista : res.data.message.miLista
                });
                this.getPeliculasLista();
            });
    }

    getPeliculasLista = () => {
        this.state.miLista.map(pelicula => {
            axios(this.url + 'pelicula/'+pelicula)
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
    
    render(){

        if(this.state.redirect) return <Navigate to={'/login'} />
        
        return(
            <React.Fragment>
                <Header inicio="true" id={window.location.pathname.split("/")[2]} />
                
                <main className="mainInicio">
                
                    <Slider />

                    <div className="centralNetflix">

                        <RowPeliculas titulo ="Mi lista" peliculasMiLista={window.location.pathname.split("/")[2]} />

                        <RowPeliculas titulo ="Seguir viendo para Adrián" progress="true" peliculasMiLista={window.location.pathname.split("/")[2]} />

                        <RowPeliculas titulo ="Series TV" series="true" miLista={window.location.pathname.split("/")[2]} />

                        <RowPeliculas titulo ="Peliculas" series="true" miLista={window.location.pathname.split("/")[2]} />

                    </div>

                </main>
                
                <Footer inicio="true" />
            </React.Fragment>
        )
    }
}

export default Inicio;