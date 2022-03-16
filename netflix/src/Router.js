import React, {Component} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Cuentas from './components/Cuentas';
import Login from './components/Login';
import Principal from './components/Principal';
import Inicio from './components/Inicio';
import NewCuenta from './components/NewCuenta';
import MiLista from './components/MiLista';
import Series from './components/Series';
import Peliculas from './components/Peliculas';
import Search from './components/Search';
import Novedades from './components/Novedades';
import Registro from './components/Registro';


class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Principal/>} />
                    <Route path="/principal" element={<Principal/>} />

                    <Route path="/registro" element={<Registro/>} />

                    <Route path="/login" element={<Login/>} />

                    <Route path="/cuentas" element={<Cuentas/>} />
                    <Route path="/new-cuenta" element={<NewCuenta/>} />

                    <Route path="/inicio/:id" element={<Inicio/>} />
                    <Route path="/inicio" element={<Cuentas/>} />

                    <Route path="/redirectUsuario/:id" element={<Redirectuser/>} />

                    <Route path="/redirectSearch/:id/:search" element={<RedirectSearch/>} />
                    <Route path="/redirectSearch/:id/" element={<RedirectSearch/>} />
                    <Route path="/search/:id/:search" element={<Search/>} />

                    <Route path="/miLista/:id" element={<MiLista/>} />
                    <Route path="/redirectMiLista/:id" element={<RedirectMiLista/>} />

                    <Route path="/series/:id" element={<Series/>} />
                    <Route path="/redirectSeries/:id" element={<RedirectSeries/>} />

                    <Route path="/peliculas/:id" element={<Peliculas/>} />
                    <Route path="/redirectPeliculas/:id" element={<RedirectPeliculas/>} />

                    <Route path="/novedades/:id" element={<Novedades/>} />
                    <Route path="/redirectNovedades/:id" element={<RedirectNovedades/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}

function Redirectuser(){
    let id = window.location.pathname.split("/")[2];
    return <Navigate to={'/inicio/'+id}/>
}

function RedirectMiLista(){
    let id = window.location.pathname.split("/")[2];
    return <Navigate to={'/miLista/'+id}/>
}

function RedirectPeliculas(){
    let id = window.location.pathname.split("/")[2];
    return <Navigate to={'/peliculas/'+id}/>
}

function RedirectSeries(){
    let id = window.location.pathname.split("/")[2];
    return <Navigate to={'/series/'+id}/>
}

function RedirectNovedades(){
    let id = window.location.pathname.split("/")[2];
    return <Navigate to={'/novedades/'+id}/>
}

function RedirectSearch(){
    let id = window.location.pathname.split("/")[2];
    let search = window.location.pathname.split("/")[3];
    if(search == ""){
        return <Navigate to={'/inicio/'+id}/>
    }else{
        return <Navigate to={'/search/'+id+'/'+search}/>
    }
}

export default Router;