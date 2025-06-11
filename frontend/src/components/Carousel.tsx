import React from 'react';
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useContextColor} from "../context/ContextColor";

interface props {
    handleClickBack : () => void
    handleClickForward : () => void
}

function Carousel({handleClickBack, handleClickForward}:props) {


    const {changeColor, color} = useContextColor()

    return (
        <div id="carouselExample" className={"carousel"}>
            <div className="carousel-inner">

                <div className="carousel-item active">
                    <div id={"shown-text"} className="d-block w-auto">VOICE</div>
                </div>

                <div className="carousel-item">
                    <div id={"shown-text1"} className="d-block w-auto">EFFECTS</div>
                </div>

                <div className="carousel-item">
                    <div id={"shown-text2"} className="d-block w-auto">MARTIN SHIT</div>
                </div>
            </div>

            <button className="carousel-control-prev" onClick={handleClickBack}>
                <IoIosArrowBack id={"btn"} size={40} color={color === "LIGHT" ? "#8C7979" : "#575757"}/>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next"
                    onClick={() => {
                        handleClickForward()
                    }}>
                <IoIosArrowForward id={"btn"} size={40} color={color === "LIGHT" ? "#8C7979" : "#575757"}/>
            </button>
        </div>
    );
}

export default Carousel;