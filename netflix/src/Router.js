import React, {Component} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Cuentas from './components/Cuentas';
import Login from './components/Login';
import Registro from './components/Registro';
import Inicio from './components/Inicio';
import NewCuenta from './components/NewCuenta';
import MiLista from './components/MiLista';
import Series from './components/Series';
import Peliculas from './components/Peliculas';
import Search from './components/Search';


class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Registro/>} />
                    <Route path="/register" element={<Registro/>} />

                    <Route path="/login" element={<Login/>} />

                    <Route path="/cuentas" element={<Cuentas/>} />
                    <Route path="/new-cuenta" element={<NewCuenta/>} />

                    <Route path="/inicio/:id" element={<Inicio/>} />
                    <Route path="/inicio" element={<Cuentas/>} />

                    <Route path="/redirectUsuario/:id" element={<Redirectuser/>} />

                    <Route path="/redirectSearch/:id/:search" element={<RedirectSearch/>} />
                    <Route path="/search/:id/:search" element={<Search/>} />

                    <Route path="/miLista/:id" element={<MiLista/>} />

                    <Route path="/series/:id" element={<Series/>} />

                    <Route path="/peliculas/:id" element={<Peliculas/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}

function Redirectuser(){
    let id = window.location.pathname.split("/")[2];
    return <Navigate to={'/inicio/'+id}/>
}

function RedirectSearch(){
    let id = window.location.pathname.split("/")[2];
    let search = window.location.pathname.split("/")[3];
    return <Navigate to={'/search/'+id+'/'+search}/>
}

export default Router;