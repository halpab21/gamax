import React, { useRef, useEffect } from "react";
import {useContextSynth} from "../../context/ContextSynth";
import {useContextColor} from "../../context/ContextColor";

interface props{
    amplitude:number
    frequency: number
}

const AnimatedSineWave: React.FC<props> = ({amplitude, frequency}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    let phase = 200;

    const {changeColor, color} = useContextColor()
    //const frequency = 0.1;


    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.clearRect(0, 0, width, height); // sonst bleibt die wave nach jedem change
        ctx.beginPath();
        ctx.strokeStyle = (color === "LIGHT" ? "grey" : "#313131");
        ctx.lineWidth = 4;

        for (let x = 0; x < width; x++) {
            const y = height / 2 + amplitude * Math.sin(frequency * x + phase);
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    };

    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { width, height } = canvas;

        phase += 0; // für bewegung
        draw(ctx, width, height);

        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [amplitude, color]);

    return (
        <canvas
            ref={canvasRef}
            style={
                {width: `${20}vw`,
                height: `${10}vw`,
                marginLeft: `${0.04}vw`}
            }
        />
    );
};

export default AnimatedSineWave;