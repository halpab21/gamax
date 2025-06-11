import React, { useState } from "react";
import { ToggleButton } from 'primereact/togglebutton';
import './ToggleButtonLight.css'
import {useContextSynth} from "../context/ContextSynth";
import {useContextColor} from "../context/ContextColor";

function ToggleButtonLight() {
    const [shownText, setShownText] = useState<string>("LIGHT")

    const {changeColor, color} = useContextColor()

    return (
        <div>
            <button style={{color: color === "LIGHT" ? "#8C7979" : "#575757", backgroundColor: color === "LIGHT" ? "#BFB6B0" : "#919191"}} id={"dark-light-btn"} onClick={
                () => {
                    if (color == "DARK") {
                        setShownText("LIGHT")
                        changeColor("LIGHT")

                    } else  {
                        setShownText("DARK")
                        changeColor("DARK")
                    }
                }
            }>{shownText}</button>
        </div>
    );
}
 export default ToggleButtonLight;