import React, {useId, useState} from 'react';
import Checkbox1 from "./checkbox/checkbox1";
import ControlPanel from "./knobs/ControlPanel";
import AnimatedSineWave from "./waveSimulation/SinusWave";
import SinusWave from "./waveSimulation/SinusWave";
import SawthootWave from "./waveSimulation/SawthootWave";
import './VoiceOneLine.css';
import checkboxWaves from "./checkbox/checkboxWaves";
import RadioButtonForm from "./checkbox/checkboxWaves";
import {useContextSynth} from "../context/ContextSynth";
import BlockWave from "./waveSimulation/BlockWave";
import {useContextColor} from "../context/ContextColor";

interface props {
    handleCheckboxChange : () => void
    counterOfOsc : number
    isChecked : boolean
    amplitude: number
}

function VoiceOneLine({handleCheckboxChange, counterOfOsc, isChecked, amplitude} : props) {

    const {changeColor, color} = useContextColor()
    const [checkPopUp, setCheckPopUp] = useState<boolean>(false)
    const [whatWave, setWhatWave] = useState<string>("default")

    const handleSelectedOption = (option:string | null) => {
        if (option == null){
            setCheckPopUp(!checkPopUp)
        }else{
            setWhatWave(option)
            setCheckPopUp(!checkPopUp)
        }
    }

    const {changeAmplitude1} = useContextSynth();
    changeAmplitude1(60)
    return (
        <div style={{color: color === "LIGHT" ? "#8C7979" : "#575757", backgroundColor: color === "LIGHT" ? "#BFB6B0" : "#919191"}} id={"singleDivs"}>
            <Checkbox1 handleCheckboxChange={handleCheckboxChange} isChecked={isChecked}
                       countOfOsc={counterOfOsc}></Checkbox1>
            <ControlPanel isChecked={isChecked}></ControlPanel>

            <div id="divForWaves" onClick={() => {
                if(!checkPopUp) {
                    setCheckPopUp(!checkPopUp)
                }
            }} style={{backgroundColor: color === "LIGHT" ? "#8C80795C" : "#727272"}}>
                {!checkPopUp && (whatWave === "default" || whatWave === "sinus") &&
                    <SinusWave frequency={0.09} amplitude={50}></SinusWave>
                }
                {!checkPopUp && whatWave === "saw" &&
                    <SawthootWave/>

                }
                {!checkPopUp && whatWave === "block" &&
                    <BlockWave frequency={0.09} amplitude={50}/>
                }
                {checkPopUp &&
                    <RadioButtonForm handleSelectedOption={handleSelectedOption} check={whatWave}></RadioButtonForm>
                }

            </div>
        </div>
    );

}

export default VoiceOneLine;