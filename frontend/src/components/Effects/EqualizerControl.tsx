// EqualizerControl.jsx
import React, { useState, useEffect, useRef } from 'react';
import './EqualizerControl.css';
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";

const EqualizerControl = () => {
    const [dbValue, setDbValue] = useState(16);
    const [boxWidth, setBoxWidth] = useState(0);
    const boxRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setBoxWidth(boxRef.current.offsetWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const changeDbValue = (changeFunction) => {
        changeFunction();
        intervalRef.current = setInterval(changeFunction, 100);
    };

    const stopChangingDbValue = () => {
        clearInterval(intervalRef.current);
    };

    const decreaseDb = () => {
        setDbValue(prevValue => Math.max(prevValue - 4, 0));
    };

    const increaseDb = () => {
        setDbValue(prevValue => Math.min(prevValue + 4, 48));
    };

    const calculatePath = () => {
        const yStart = 18;
        const yEnd = yStart + (dbValue / 30) * 20;
        return `M 0 ${yStart} L ${boxWidth / 2} ${yStart} Q ${boxWidth * 0.75} ${yStart} ${boxWidth} ${yEnd}`;
    };

    return (
        <div className="equalizer-control" ref={boxRef}>
            <div className="control-header">
                <button
                    className="arrow-button"
                    onMouseDown={() => changeDbValue(decreaseDb)}
                    onMouseUp={stopChangingDbValue}
                    onMouseLeave={stopChangingDbValue}
                >
                    <AiFillCaretLeft/>
                </button>
                <span className="label">High {dbValue}dB</span>
                <button
                    className="arrow-button"
                    onMouseDown={() => changeDbValue(increaseDb)}
                    onMouseUp={stopChangingDbValue}
                    onMouseLeave={stopChangingDbValue}
                >
                    <AiFillCaretRight/>
                </button>
            </div>
            <div className="graph">
                <svg width="100%" height="6vh" viewBox={`0 0 ${boxWidth} 50`}>
                    <path d={calculatePath()} stroke="black" strokeWidth="3" fill="none" />
                </svg>
            </div>
        </div>
    );
};

export default EqualizerControl;
