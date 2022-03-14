import React, {Component} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cuentas from './components/Cuentas';
import Header from './components/Header';
import Login from './components/Login';
import Registro from './components/Registro';
import Inicio from './components/Inicio';


class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Registro/>} />
                    <Route path="/register" element={<Registro/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/cuentas" element={<Cuentas/>} />
                    <Route path="/inicio" element={<Inicio/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default Router;