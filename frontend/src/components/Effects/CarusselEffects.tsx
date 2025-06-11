import React, { useState } from 'react';

const CarouselEffects: React.FC = () => {
    const [highDb, setHighDb] = useState(16);

    const increaseHighDb = () => setHighDb(prev => Math.min(prev + 1, 20));
    const decreaseHighDb = () => setHighDb(prev => Math.max(prev - 1, 0));

    return (
        <div className="filter-container">
            <button onClick={decreaseHighDb}>&lt;</button>
            <div className="filter-display">
                <span>High {highDb}dB</span>
                <div className="frequency-response">
                    <div className="response-curve" style={{ height: `${100 - highDb * 5}%` }}></div>
                </div>
            </div>
            <button onClick={increaseHighDb}>&gt;</button>
        </div>
    );
}

export default CarouselEffects