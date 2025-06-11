import React, { useState, useEffect, useRef } from 'react';

const styles = {
    container: {
        marginTop: '2vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '85%',
        maxWidth: '90%',
        margin: '0 auto'
    },
    mainContainer: {
        marginTop: '2vh',
        width: '105%',
        height: '105%',
        backgroundColor: '#BFB6B0',
        borderRadius: '1.5vw',
        padding: '1rem',
        marginBottom: '0.5rem'
    },
    waveformDisplay: {
        backgroundColor: '#8C807959',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        width: '100%',
        height: '10rem'
    },
    controlsArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        marginTop: '0.5rem'
    },
    waveformSelector: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#595959',
        borderRadius: '9999px',
        padding: '0.5rem 1rem',
        width: '10rem',
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
    },
    selectorLabel: {
        fontSize: '0.75rem',
        fontWeight: '500',
        paddingRight: '0.5rem',
    },
    selector: {
        fontSize: '0.875rem',
        border: 'none',
        padding: '0',
        width: '100%',
        outline: 'none',
        backgroundColor: '#595959',
    },
    frequencyLabel: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#595959',
        borderRadius: '9999px',
        padding: '0.5rem 1rem',
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
    },
    frequencyText: {
        fontSize: '0.75rem',
        backgroundColor: '#595959',
        fontWeight: '500'
    },
    knobsContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        gap: '1.5rem'
    },
    knobContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    knob: {
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        backgroundColor: '#3c3c3c',
        position: 'relative',
        cursor: 'pointer'
    },
    knobIndicator: {
        position: 'absolute',
        width: '0.25rem',
        height: '1.25rem',
        backgroundColor: 'white',
        borderRadius: '9999px',
        transformOrigin: 'bottom center',
        bottom: '50%',
        left: '50%'
    },
    knobLabel: {
        textAlign: 'center',
        marginTop: '0.25rem',
        fontSize: '0.75rem',
        color: '#374151'
    }
};

// Importieren der bestehenden Knob-Komponente
const EffectsKnob = ({ label, onChange, value, isChecked = true }) => {
    const [angle, setAngle] = useState(value * 360);
    const knobRef = useRef(null);
    const isDragging = useRef(false);
    const startAngleRef = useRef(0);
    const initialAngleRef = useRef(0);

    const sensitivity = 1;

    useEffect(() => {
        // Update angle when value changes externally
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

            // Beschränke auf 0-270 Grad für den Drehbereich
            const clampedAngle = Math.max(0, Math.min(360, newAngleValue));
            setAngle(clampedAngle);

            // Berechne den Wert basierend auf dem Winkel (0-1 Range)
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

const LFOGraph = () => {
    const [points, setPoints] = useState([]);
    const [parameters, setParameters] = useState({
        waveform: 'sine',
        frequency: 0.5, // 0-1 normalisiert
        amplitude: 0.8, // 0-1 normalisiert
        phase: 0.25,    // 0-1 normalisiert
    });

    // Calculate points for the waveform
    useEffect(() => {
        const calculatePoints = () => {
            const newPoints = [];
            const totalPoints = 300;

            // Denormalisieren der Werte
            const frequency = parameters.frequency * 5;  // 0-5 Hz
            const amplitude = parameters.amplitude;      // 0-1 bleibt gleich
            const phase = parameters.phase * 2 * Math.PI; // 0-2π
            const { waveform } = parameters;

            for (let i = 0; i < totalPoints; i++) {
                const x = i / totalPoints * 2; // 2 seconds total
                let y = 0;

                // Calculate y based on waveform type
                switch (waveform) {
                    case 'sine':
                        y = amplitude * Math.sin(2 * Math.PI * frequency * x + phase);
                        break;
                    case 'square':
                        y = amplitude * Math.sign(Math.sin(2 * Math.PI * frequency * x + phase));
                        break;
                    case 'triangle':
                        y = amplitude * (2 * Math.abs((((frequency * x + phase / (2 * Math.PI)) % 1) * 2) - 1) - 1);
                        break;
                    case 'sawtooth':
                        y = amplitude * (2 * ((frequency * x + phase / (2 * Math.PI)) % 1) - 1);
                        break;
                    default:
                        y = amplitude * Math.sin(2 * Math.PI * frequency * x + phase);
                }

                newPoints.push({ x, y });
            }

            return newPoints;
        };

        setPoints(calculatePoints());
    }, [parameters]);

    // Handle parameter changes
    const handleParameterChange = (parameter, value) => {
        setParameters(prev => ({
            ...prev,
            [parameter]: value
        }));
    };

    // Denormalisierte Werte für die Anzeige
    const displayFrequency = (parameters.frequency * 5).toFixed(1);

    const width = 590;
    const height = 160;
    const padding = 10;

    // Function to create the waveform path
    const createPath = () => {
        if (points.length === 0) return '';

        const xScale = (p) => (p.x / 2) * (width - 2 * padding) + padding;
        const yScale = (p) => height / 2 - p.y * (height / 2 - padding);

        return points.map((point, i) =>
            `${i === 0 ? 'M' : 'L'} ${xScale(point)} ${yScale(point)}`
        ).join(' ');
    };

    const gridLines = [];
    const numGridLines = 9;
    for (let i = 0; i < numGridLines; i++) {
        const x = padding + (i * (width - 2 * padding) / (numGridLines - 1));
        gridLines.push(
            <line
                key={`grid-${i}`}
                x1={x}
                y1={padding}
                x2={x}
                y2={height - padding}
                stroke="#BBBBBB"
                strokeWidth="1"
                strokeDasharray="3.3"
            />
        );
    }

    return (
        <div style={styles.container}>
            {/* Main container */}
            <div style={styles.mainContainer}>
                {/* Waveform display area */}
                <div style={styles.waveformDisplay}>
                    <svg width={width} height={height}>
                        {gridLines}

                        <path
                            d={createPath()}
                            fill="none"
                            stroke="#333333"
                            strokeWidth="3"
                        />

                    </svg>
                </div>

                {/* Controls area */}
                <div style={styles.controlsArea}>
                    {/* Waveform selector (replacing MODE with larger width) */}
                    <div style={styles.waveformSelector}>
                        <div style={styles.selectorLabel}>MODE:</div>
                        <select
                            value={parameters.waveform}
                            onChange={(e) => handleParameterChange('waveform', e.target.value)}
                            style={styles.selector}
                        >
                            <option value="sine">sine</option>
                            <option value="square">square</option>
                            <option value="triangle">triangle</option>
                            <option value="sawtooth">sawtooth</option>
                        </select>
                    </div>

                    {/* Frequency Label */}
                    <div style={styles.frequencyLabel}>
                        <div style={styles.frequencyText}>Frequency: {displayFrequency}</div>
                    </div>

                    {/* Knobs */}
                    <div style={styles.knobsContainer}>
                        <EffectsKnob
                            label="freq"
                            value={parameters.frequency}
                            onChange={(val) => handleParameterChange('frequency', val)}
                            isChecked={true}
                        />

                        <EffectsKnob
                            label="ampl"
                            value={parameters.amplitude}
                            onChange={(val) => handleParameterChange('amplitude', val)}
                            isChecked={true}
                        />

                        <EffectsKnob
                            label="phase"
                            value={parameters.phase}
                            onChange={(val) => handleParameterChange('phase', val)}
                            isChecked={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LFOGraph;