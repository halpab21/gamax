import React, {useState, useRef, useEffect} from 'react';
import "./Effects.css"
import {useContextColor} from "../../context/ContextColor";

interface KnobControlProps {
    label: string;
    unit?: string;
    isChecked : boolean
}

const EffectsKnob: React.FC<KnobControlProps> = ({ label, unit , isChecked}) => {
    const [angle, setAngle] = useState(0);
    const {changeColor, color} = useContextColor()
    const knobRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startAngleRef = useRef(0);
    const initialAngleRef = useRef(0);

    const sensitivity = 1;

    const updateValue = (angle: number) => {
        const displayValue = Math.round((angle / 270) * 100);
    };

    const startDragging = (e: React.MouseEvent) => {
        if (isChecked) {
            e.preventDefault();
            isDragging.current = true;

            const rect = knobRef.current!.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const startAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            startAngleRef.current = startAngle;
            initialAngleRef.current = angle;

            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", stopDragging);
        }
    };

    const stopDragging = () => {
        if (isChecked) {
            isDragging.current = false;
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("mouseup", stopDragging);
        }
    };

    const onDrag = (e: MouseEvent) => {
        if(isChecked) {
            if (!isDragging.current || !knobRef.current) return;

            const rect = knobRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const currentAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            let angleDelta = (currentAngle - startAngleRef.current) * sensitivity;
            let newAngleValue = (initialAngleRef.current + angleDelta) % 360;
            if (newAngleValue < -1) {
                newAngleValue += 360;
            }


            setAngle(newAngleValue);
        }
    };

    const displayValue = Math.round((angle / 360) * 100);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDisplayValue = Math.min(100, Math.max(0, Number(e.target.value)));
        const newAngle = (newDisplayValue / 100) * 360;
        setAngle(newAngle);

    };

    const handleFocus = (event :React.FocusEvent<HTMLInputElement>) => event.target.select();

    return (
        <div className="knob-control">
            <div
                className="knob"
                ref={knobRef}
                style={{transform: `rotate(${angle}deg)`}}
                onMouseDown={startDragging}
            >
                <div className="knob-indicator"></div>
            </div>
            <div className="knob-label" style={{color: color === "LIGHT" ? "#4b4b4b" : "black"}}>
                {label}
            </div>
        </div>
    );
};

export default EffectsKnob;
