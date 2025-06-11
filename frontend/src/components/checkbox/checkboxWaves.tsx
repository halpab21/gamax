import React, {useEffect, useState} from "react";
import './checkboxWaves.css'
import {FaBeer} from "react-icons/fa";
import {FaX} from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

interface props{
    check: string
    handleSelectedOption(value: string | null): void
}

const RadioButtonForm: React.FC<props> = ({check, handleSelectedOption}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const changeWaveType = async () => {
        try {
            const response = await axios.get<string>("http://localhost:8080/changeWaveType");
            console.log("Server response:", response.data);
        } catch (error) {
            console.error("Failed to change wave type:", error);
        }
    };


    const handleChange1 = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption("sinus")
        await changeWaveType();
        console.log(check)
    };

    const handleChange2 = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption("saw")
        await changeWaveType();
        console.log(check)
    };
    const handleChange3 = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption("block")
        await changeWaveType();
        console.log(check)
    };

    const handleContinue = () => {
        handleSelectedOption(selectedOption)
    };

    const uuid = uuidv4()

    return (
        <div id={"outer-container"}>
            <label className="round-checkbox-container1">
                <input
                    type="radio"
                    name={'round-radio-group-' + uuid}
                    onChange={handleChange1}
                    className="round-checkbox-input1"
                />
                <span className="round-checkbox-custom1"></span>
                <span className="round-checkbox-text1">Sinus Wave</span>
            </label>
            <label className="round-checkbox-container1">
                <input
                    type="radio"
                    name={'round-radio-group-' + uuid}
                    onChange={handleChange2}
                    className="round-checkbox-input1"
                />
                <span className="round-checkbox-custom1"></span>
                <span className="round-checkbox-text1">Sawtooth Wave</span>
            </label>
            <label className="round-checkbox-container1">
                <input
                    type="radio"
                    name={'round-radio-group-' + uuid}
                    onChange={handleChange3}
                    className="round-checkbox-input1"
                />
                <span className="round-checkbox-custom1"></span>
                <span className="round-checkbox-text1">Block Wave</span>
            </label>

            <FaX id={"exit-button"} onClick={() => {handleContinue()}}/>
        </div>
    );
};

export default RadioButtonForm;
