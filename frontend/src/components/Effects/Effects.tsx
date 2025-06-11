import React from 'react';
import "./Effects.css"
import {AiOutlineHolder} from "react-icons/ai";
import EffectsKnob from "./EffectsKnob";
import KnobContainer from "./KnobContainer";
import EqualizerControl from "./EqualizerControl";
import {IoIosMusicalNote} from "react-icons/io";
import EnvelopeGraph from "./EnvelopeGraph";
import LFOGraph from "./LFOGraph";
import {useContextColor} from "../../context/ContextColor";

const Effects = () => {

    const {changeColor, color} = useContextColor()

    return (
       <div id={"container-Effects"}>

           <div id={"col-left"}>

               <div className={"EffectOneLine"} style={{color: color === "LIGHT" ? "#8C7979" : "#575757", backgroundColor: color === "LIGHT" ? "#BFB6B0" : "#919191"}}>
                   <div className={"Options"}  style={{backgroundColor: color === "LIGHT" ? "#8C80795C" : "#727272"}}>
                       <AiOutlineHolder size={55} color={"black"}/>
                   </div>
                    <KnobContainer/>
               </div>

               <div className={"EffectOneLine"} style={{color: color === "LIGHT" ? "#8C7979" : "#575757", backgroundColor: color === "LIGHT" ? "#BFB6B0" : "#919191"}}>
                   <div className={"Options"} style={{backgroundColor: color === "LIGHT" ? "#8C80795C" : "#727272"}}>
                       <AiOutlineHolder size={55} color={"black"}/>
                   </div>
                   <KnobContainer/>
                   <div id={"EqualizerControlContainer"}>
                       <EqualizerControl/>
                   </div>
               </div>

               <div className={"EffectOneLine"} >
                   <div className={"Options"} style={{backgroundColor: color === "LIGHT" ? "#8C80795C" : "grey"}}>
                       <AiOutlineHolder size={55}/>
                   </div>

                   <div id={"smallKnobContainer"}>
                       <div id={"smallKnobContainerHeader"}>
                           <div>LOW BAND</div>
                           <div>MID BAND</div>
                           <div>HIGH BAND</div>
                       </div>

                       <div id={"smallKnobContainerKnobs"}>
                           <EffectsKnob label={"Cutoff"} isChecked={true}/>
                           <EffectsKnob label={"Type"} isChecked={true}/>
                           <EffectsKnob label={"Gain"} isChecked={true}/>
                           <EffectsKnob label={"Mix"} isChecked={true}/>
                       </div>
                   </div>
               </div>

               <div className={"EffectOneLine"}>
                   <div className={"Options"} style={{backgroundColor: color === "LIGHT" ? "#8C80795C" : "#727272"}}>
                       <AiOutlineHolder size={55}/>
                   </div>
                   <div id={"outerFrequency"}>
                       <div id={"innerFrequency"}>
                           <p>Frequency</p>
                           <IoIosMusicalNote />
                       </div>
                   </div>
               </div>
            </div>

           <div id={"col-right"}>
               <div id={"col-right-upper"}>
                    <EnvelopeGraph/>
               </div>

               <div id={"col-right-lower"}>
                    <LFOGraph/>
               </div>
           </div>
       </div>
    );
};

export default Effects;