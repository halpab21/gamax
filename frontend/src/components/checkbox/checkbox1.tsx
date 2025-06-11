import './checkbox.css'
import {useContextColor} from "../../context/ContextColor";

interface props {
    handleCheckboxChange: () => void
    isChecked: boolean
    countOfOsc: number
}

function Checkbox1({handleCheckboxChange, isChecked, countOfOsc}:props) {

    const {changeColor, color} = useContextColor()
    // background-color: #8C7979;
    //     border-color: #8C7979;
    return (
        <div className="checkbox-container">
            <label style={{backgroundColor: color === "LIGHT" ? "#8C80795C" : "#727272"}}
                   className="round-checkbox-container">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="round-checkbox-input"
                    style={{borderColor: color === "LIGHT" ? "#8C7979" : "black",
                        backgroundColor: color === "LIGHT" ? "#8C7979" : "black"}}
                />
                <span id={"afterSpan"} style={{backgroundColor: color === "LIGHT" ? "white" : "#c6c6c6"}} className="round-checkbox-custom"></span>
                <span style={{color: color === "LIGHT" ? "#4b4b4b" : "black"}}
                    className="label-text">OSC {+countOfOsc}</span>
            </label>
            <style>
                {`
         

          .round-checkbox-custom::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: "black"
            transition: transform 0.2s ease;
          }
        `}
            </style>
        </div>
    );
}

export default Checkbox1;