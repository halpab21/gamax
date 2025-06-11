import React from 'react';
import ScalePitch from './ScalePitch';
import './KnobControl.css'
import {useContextSynth} from "../../context/ContextSynth";
import {useContextColor} from "../../context/ContextColor";

interface props {
    isChecked : boolean
}

function ControlPanel({isChecked} : props) {

    const {changeColor, color} = useContextColor()


    return (
        <div className="control-panel" style={{backgroundColor: color === "LIGHT" ? "#8C80795C" : "#727272"}}>
            <ScalePitch isChecked={isChecked} label="scale" unit="%" />
            <ScalePitch isChecked={isChecked} label="pitch" unit="%" />
            <div className={"SecControlPanel"} style={{backgroundColor: color === "LIGHT" ? "#8C80795C" : "#5f5f5f"}}>
                <ScalePitch isChecked={isChecked} label="unison" unit="%" />
                <ScalePitch isChecked={isChecked} label="phase" unit="%" />
            </div>
        </div>
    );
}

export default ControlPanel;
