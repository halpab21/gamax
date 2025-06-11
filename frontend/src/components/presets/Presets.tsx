import React, {useState} from 'react';
import './Presets.css'
import {useContextColor} from "../../context/ContextColor";


function Presets() {

    const {changeColor, color} = useContextColor()
    const options = ["PRESETS", "Bohemian Rhapsody", "Smells Like Teen Spirit", "Hotel California", "Billie Jean", "Wonderwall"];
    const [selectedValue, setSelectedValue] = useState("PRESETS");
    return (
        <select style={{color: color === "LIGHT" ? "#8C7979" : "#575757", backgroundColor: color === "LIGHT" ? "#BFB6B0" : "#919191"}} id={"dropdown-select"}>
            {options.map((option, index) => (
                <option id={"option-sigma"} key={index} value={option}>{option}</option>
            ))}
        </select>
    );
}

export default Presets;