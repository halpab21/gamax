import React, { useRef, useEffect } from "react";
import {useContextSynth} from "../../context/ContextSynth";

interface AnimatedSawtoothWave{

}

const AnimatedSawtoothWave: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    let phase = 0;

    const {amplitude1} = useContextSynth()

    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 4;

        const frequency = 0.02;

        for (let x = 0; x < width - 20; x++) {
            const y = height / 2 + amplitude1 * (2 * ((x * frequency + phase) % 1) - 1);

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
    }, [amplitude1]);

    return (
        <canvas
            ref={canvasRef}
            style={
                {
                    width: `${21}vw`,
                    height: `${10}vw`,
                    marginLeft: `${0.3}vw`
                }
            }
        />
    );
};

export default AnimatedSawtoothWave;
