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
        cuenta : {}
    }

    componentDidMount(){
        this.getUsuario();
    }

    getUsuario = () => {
        let token = {
            token : localStorage.getItem("token")
        };

        axios.post(this.url + "cuenta",token)
            .then(res => {
                console.log(res.data.usuario[0]);
                this.setState({
                    cuenta : res.data.usuario[0]
                })
            })
            .catch(err => {
                this.setState({
                    redirect : true
                })
            })
    }
    
    render(){

        if(this.state.redirect) return <Navigate to={'/login'} />
        
        return(
            <React.Fragment>
                <Header inicio="true" />
                
                <main className="mainInicio">
                
                    <Slider />

                    <div className="centralNetflix">
                        <RowPeliculas titulo ="Mi lista" />

                        <RowPeliculas titulo ="Seguir viendo para Adrián" progress="true" />

                        <RowPeliculas titulo ="Series TV" />
                    </div>

                </main>
                
                <Footer inicio="true" />
            </React.Fragment>
        )
    }
}

export default Inicio;