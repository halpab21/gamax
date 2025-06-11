import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";

const styles = {
    container: {
        backgroundColor: '#BFB6B0',
        borderRadius: '15px',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        height: '35vh',
        padding: '1vh'
    },
    envButtonContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '15px',
        justifyContent: 'space-between',
        height: '100%'
    },
    envButton: {
        width: '40px',
        backgroundColor: '#222222',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        padding: '10px 0',
        boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), 2px 2px 4px rgba(255,255,255,0.1)'
    },
    envButtonActive: {
        backgroundColor: '#666666',
    },
    graphContainer: {
        flex: 1,
        backgroundColor: '#8C807959',
        borderRadius: '10px',
        padding: '10px',
        height: '25vh',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
    },
    knobsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    knobContainer: {
        marginTop: '2.5vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    knob: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#3c3c3c',
        marginTop: '1vh',
        position: 'relative',
        cursor: 'pointer',
    },
    knobIndicator: {
        position: 'absolute',
        width: '4px',
        height: '16px',
        backgroundColor: 'white',
        borderRadius: '2px',
        transformOrigin: 'bottom center',
        bottom: '50%',
        left: '50%'
    },
    knobLabel: {
        textAlign: 'center',
        marginTop: '5px',
        fontSize: '10px',
        color: '#333333',
        textTransform: 'uppercase'
    }
};

const EffectsKnob = ({ label, onChange, value, isChecked = true }) => {
    const [angle, setAngle] = useState(value * 360);
    const knobRef = useRef(null);
    const isDragging = useRef(false);
    const startAngleRef = useRef(0);
    const initialAngleRef = useRef(0);

    const sensitivity = 1;

    useEffect(() => {
        setAngle(value * 360);
    }, [value]);

    const startDragging = (e) => {
        if (isChecked) {
            e.preventDefault();
            isDragging.current = true;

            const rect = knobRef.current.getBoundingClientRect();
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

    const onDrag = (e) => {
        if (isChecked) {
            if (!isDragging.current || !knobRef.current) return;

            const rect = knobRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const currentAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            let angleDelta = (currentAngle - startAngleRef.current) * sensitivity;
            let newAngleValue = (initialAngleRef.current + angleDelta) % 360;
            if (newAngleValue < 0) {
                newAngleValue += 360;
            }

            const clampedAngle = Math.max(0, Math.min(360, newAngleValue));
            setAngle(clampedAngle);

            const newValue = clampedAngle / 360;
            onChange(newValue);
        }
    };

    return (
        <div style={styles.knobContainer}>
            <div
                style={styles.knob}
                ref={knobRef}
                onMouseDown={startDragging}
            >
                <div
                    style={{
                        ...styles.knobIndicator,
                        transform: `translateX(-50%) rotate(${angle}deg)`
                    }}
                />
            </div>
            <div style={styles.knobLabel}>{label}</div>
        </div>
    );
};

const EnvelopeGraph = () => {
    const [activeEnv, setActiveEnv] = useState(1);
    const [envelopes, setEnvelopes] = useState({
        1: { delay: 0, attack: 0.3, hold: 0.5, decay: 0.7, sustain: 0.4, release: 0.2 },
        2: { delay: 0, attack: 0.4, hold: 0.6, decay: 0.6, sustain: 0.3, release: 0.1 },
        3: { delay: 0, attack: 0.2, hold: 0.4, decay: 0.8, sustain: 0.5, release: 0.3 }
    });

    const updateEnvelope = async (envelopeId: number) => {
        const { attack, decay, sustain, release } = envelopes[envelopeId];

        try {
            // Sending GET request to the backend
            const response = await axios.get(
                `http://localhost:8080/update-envelope?attack=${attack}&decay=${decay}&sustain=${sustain}&release=${release}`
            );

            // Logging response and updating UI or showing a message if needed
            console.log(response.data);
        } catch (error) {
            console.error("Error updating envelope:", error);
        }
    };

    useEffect(() => {
        // Loop over the envelopes and update each one
        Object.keys(envelopes).forEach((key) => {
            const envelopeId = Number(key);
            updateEnvelope(envelopeId);
        });
    }, [envelopes]);

    const svgRef = useRef(null);

    const handleEnvSwitch = (envNumber) => {
        setActiveEnv(envNumber);
    };

    const updateEnvelopeValue = (stage, value) => {
        setEnvelopes(prev => ({
            ...prev,
            [activeEnv]: {
                ...prev[activeEnv],
                [stage]: value
            }
        }));
    };

    const calculateCurvePoints = () => {
        const env = envelopes[activeEnv];
        const stages = ['delay', 'attack', 'hold', 'decay', 'sustain', 'release'];
        const points = stages.map((stage, index) => ({
            x: index * 136 + 10,
            y: 200 - (env[stage] * 200)
        }));
        return points;
    };

    const generateSvgPath = () => {
        const points = calculateCurvePoints();
        const pathCommands = points.map((point, index) =>
            index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
        );
        return pathCommands.join(' ');
    };

    const handlePointDrag = (index, event) => {
        if (!svgRef.current) return;

        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());

        const stages = ['delay', 'attack', 'hold', 'decay', 'sustain', 'release'];
        const stage = stages[index];

        // Ensure point can only move vertically
        const newValue = Math.max(0, Math.min(1, (200 - svgPt.y) / 200));

        setEnvelopes(prev => ({
            ...prev,
            [activeEnv]: {
                ...prev[activeEnv],
                [stage]: newValue
            }
        }));
    };

    const stages = ['delay', 'attack', 'hold', 'decay', 'sustain', 'release'];

    return (
        <div style={styles.container}>
            <div style={styles.envButtonContainer}>
                {[1, 2, 3].map(env => (
                    <button
                        key={env}
                        style={{
                            ...styles.envButton,
                            ...(activeEnv === env ? styles.envButtonActive : {})
                        }}
                        onClick={() => handleEnvSwitch(env)}
                    >
                        ENV {env}
                    </button>
                ))}
            </div>

            <div style={styles.graphContainer}>
                <div style={styles.svgContainer}>
                    <svg ref={svgRef} viewBox="0 0 700 201" width="100%" height="100%">
                        {[...Array(8)].map((_, i) => (
                            <line
                                key={`vline-${i}`}
                                x1={i * 100}
                                y1={0}
                                x2={i * 100}
                                y2={200}
                                stroke="#444444"
                                strokeDasharray="5,5"
                            />
                        ))}

                        {[...Array(5)].map((_, i) => (
                            <line
                                key={`hline-${i}`}
                                x1={0}
                                y1={i * 50}
                                x2={700}
                                y2={i * 50}
                                stroke="#444444"
                                strokeDasharray="5.5"
                            />
                        ))}

                        <path
                            d={generateSvgPath()}
                            fill="none"
                            stroke="#CCCCCC"
                            strokeWidth="3"
                        />

                        {calculateCurvePoints().map((point, index) => (
                            <circle
                                key={stages[index]}
                                cx={point.x}
                                cy={point.y}
                                r="8"
                                fill="#1C1C1C"
                                stroke="#CCCCCC"
                                strokeWidth="2"
                                style={{ cursor: 'pointer' }}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    const onMouseMove = (moveEvent) => {
                                        handlePointDrag(index, moveEvent);
                                    };
                                    const onMouseUp = () => {
                                        document.removeEventListener('mousemove', onMouseMove);
                                        document.removeEventListener('mouseup', onMouseUp);
                                    };
                                    document.addEventListener('mousemove', onMouseMove);
                                    document.addEventListener('mouseup', onMouseUp);
                                }}
                            />
                        ))}
                    </svg>
                </div>

                <div style={styles.knobsContainer}>
                    {stages.map(stage => (
                        <EffectsKnob
                            key={stage}
                            label={stage}
                            value={envelopes[activeEnv][stage]}
                            onChange={(val) => updateEnvelopeValue(stage, val)}
                            isChecked={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EnvelopeGraph;