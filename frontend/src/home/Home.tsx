import React, {useEffect, useState} from "react";
import '../App.css'
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

import Wave from "react-wavify";
import { CiSettings } from "react-icons/ci";
import AnimatedSineWave from "./components/waveSimulation/SinusWave";

import {useNavigate} from "react-router-dom";
import Carousel from "../components/Carousel";
import Presets from "../components/presets/Presets";
import Voice from "../Voice";
import Effects from "../components/Effects/Effects";
import ToggleButtonLight from "../settings/ToggleButtonLight";
import {useContextColor} from "../context/ContextColor";

function Home() {

    const {changeColor, color} = useContextColor()
    const [show, setShow] = useState(false)
    const [showVoice, setShowVoice] = useState(true)
    const [counterForShown, setCounterForShown] = useState(1);
    const [input, setInput] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        if(color == "LIGHT") {
            document.body.style.backgroundColor = '#8C8079';
            document.getElementById("Piano").style.backgroundColor = '#BFB6B0';
            document.getElementById("shown-text").style.backgroundColor = '#BFB6B0';
            document.getElementById("shown-text").style.color = '#8C7979';
            document.getElementById("shown-text1").style.backgroundColor = '#BFB6B0';
            document.getElementById("shown-text1").style.color = '#8C7979';
            document.getElementById("shown-text2").style.backgroundColor = '#BFB6B0';
            document.getElementById("shown-text2").style.color = '#8C7979';
            //(document.querySelectorAll(".whitePinoKey") as NodeListOf<HTMLElement>).forEach(v => v.style.backgroundColor = 'white');

        } else {
            document.body.style.backgroundColor = '#626262';
            document.getElementById("Piano").style.backgroundColor = '#919191';
            document.getElementById("shown-text").style.backgroundColor = '#919191';
            document.getElementById("shown-text").style.color = '#575757';
            document.getElementById("shown-text1").style.backgroundColor = '#919191';
            document.getElementById("shown-text1").style.color = '#575757';
            document.getElementById("shown-text2").style.backgroundColor = '#919191';
            document.getElementById("shown-text2").style.color = '#575757';
            //(document.querySelectorAll(".whitePinoKey") as NodeListOf<HTMLElement>).forEach(v => v.style.backgroundColor = 'lightgrey');


        }
        // style={{color: colorText}


    }, [color, counterForShown]);


    const handleClickBack = () => {
        if(counterForShown == 1) {
            setCounterForShown(3)
        } else {
            setCounterForShown(counterForShown - 1)
        }

        const carousel = document.getElementById("carouselExample");
        // @ts-ignore
        const items = carousel.getElementsByClassName("carousel-item");
        let activeIndex = -1;

        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains("active")) {
                activeIndex = i;
                items[i].classList.remove("active");
                break;
            }
        }

        const prevIndex = (activeIndex - 1 + items.length) % items.length;
        items[prevIndex].classList.add("active");
    }

    const handleClickForward = () => {
        if(counterForShown == 3) {
            setCounterForShown(1);
        } else {
            setCounterForShown(counterForShown + 1);
        }

        const carousel = document.getElementById("carouselExample");

        // @ts-ignore
        const items = carousel.getElementsByClassName("carousel-item");
        let activeIndex = -1;

        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains("active")) {
                activeIndex = i;
                items[i].classList.remove("active");
                break;
            }
        }

        const nextIndex = (activeIndex + 1) % items.length;
        items[nextIndex].classList.add("active");
    }
    function renderPiano() {
        const renderedItems = [];
        for (let i = 0; i < 44; i++) {
            renderedItems
                .push(
                    <div style={{backgroundColor: color === "LIGHT" ? "white" : "#c6c6c6"}} key={i} className={'whitePinoKey'}></div>
                );
        }
        return renderedItems
    }

    return (
        <div>
            <div id={"top"}>
                <Carousel handleClickBack={handleClickBack} handleClickForward={handleClickForward}></Carousel>

                <Presets/>
                <ToggleButtonLight/>
            </div>
            {counterForShown == 1 &&
                <div id={"VOICE-DIV"}>
                  <Voice text={"tester text"}></Voice>
                </div>
            }

            {counterForShown == 2 &&
                <div id={"effects-div"}>
                  <Effects/>
                </div>
            }

            <div id={"Piano"}>
                {renderPiano()}
            </div>
        </div>
    )
}

export default Home;