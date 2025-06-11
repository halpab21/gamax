import React from 'react';
import EffectsKnob from "./EffectsKnob";
import "./Effects.css"
import {useContextColor} from "../../context/ContextColor";

const KnobContainer = () => {

    const {changeColor, color} = useContextColor()
    return (
        <div id={"KnobContainer"} style={{backgroundColor: color === "LIGHT" ? "#8C80795C" : "#727272"}}>
            <EffectsKnob label={"Threshold"} isChecked={true}/>
            <EffectsKnob label={"Ratio"} isChecked={true}/>
            <EffectsKnob label={"Attack"} isChecked={true}/>
            <EffectsKnob label={"Gain"} isChecked={true}/>
            <EffectsKnob label={"Mix"} isChecked={true}/>
        </div>
    );
};

export default KnobContainer;