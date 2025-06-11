import React, {useState} from 'react';
import Checkbox1 from "./components/checkbox/checkbox1";
import ControlPanel from "./components/knobs/ControlPanel";
import VoiceOneLine from "./components/VoiceOneLine";
import {useContextSynth} from "./context/ContextSynth";

interface props {
    text: string
}

function Voice({text} : props) {
    const [isChecked1, setIsChecked1] = useState(false);


    const handleCheckboxChange1 = () => {
        setIsChecked1(!isChecked1);
        changeAmplitude1(10)
    };

    const [isChecked2, setIsChecked2] = useState(false);

    const handleCheckboxChange2 = () => {
        setIsChecked2(!isChecked2);
    };
    const [isChecked3, setIsChecked3] = useState(false);

    const handleCheckboxChange3 = () => {
        setIsChecked3(!isChecked3);
    };

    const {amplitude1, amplitude2, amplitude3, changeAmplitude1, changeAmplitude2, changeAmplitude3} = useContextSynth()

    return (
        <>
            <VoiceOneLine amplitude={amplitude1} handleCheckboxChange={handleCheckboxChange1} isChecked={isChecked1} counterOfOsc={1}></VoiceOneLine>
            <VoiceOneLine amplitude={amplitude2} handleCheckboxChange={handleCheckboxChange2} isChecked={isChecked2} counterOfOsc={2}></VoiceOneLine>
            <VoiceOneLine amplitude={amplitude3} handleCheckboxChange={handleCheckboxChange3} isChecked={isChecked3} counterOfOsc={3}></VoiceOneLine>
        </>
    );
}

export default Voice;