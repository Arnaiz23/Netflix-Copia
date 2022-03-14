import React, {Component} from "react";
import Footer from "./Footer";
import Header from "./Header";
import RowPeliculas from "./RowPeliculas";
import Slider from "./Slider";

class Inicio extends Component{
    render(){
        return(
            <React.Fragment>
                <Header inicio="true" />
                
                <main class="mainInicio">
                
                    <Slider />

                    <div class="centralNetflix">
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