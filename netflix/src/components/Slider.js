import React, { Component } from "react";

import imagen from '../assets/images/community.png';

class Slider extends Component {
    render() {
        return (
            <div className="inicioBanner">
                <div className="inicioBannerTitle">
                    <img src={imagen} alt="community serie" />
                    <p>Cuando se descubre que su diploma es falso, Jeff Winger vuelve a la universidad y forma un grupo de
                        marginados. (Un episodio de la 2.ª temporada no está disponible).</p>
                    <div>
                        <span className="btn btn-light" id="play">
                            <i className="fa-solid fa-play"></i>
                            <a href="">Reproducir</a>
                        </span>
                        <span className="btn btn-secondary" id="masInfo">
                            <i className="fa-solid fa-circle-info"></i>
                            <a href="">Más información</a>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Slider;