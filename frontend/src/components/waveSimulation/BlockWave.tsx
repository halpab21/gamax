import React, { useRef, useEffect } from "react";

interface Props {
    amplitude: number;
    frequency: number;
}

const AnimatedBlockWave: React.FC<Props> = ({ amplitude, frequency }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    let phase = 10;

    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 4;

        const midY = height / 2;

        for (let x = 0; x < width; x++) {
            const y =
                Math.sin(frequency * x + phase) >= 0
                    ? midY - amplitude
                    : midY + amplitude; // Obere oder untere Linie

            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    };

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [amplitude]);

    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { width, height } = canvas;

        phase += 0;
        draw(ctx, width, height);

        animationRef.current = requestAnimationFrame(animate);
    };

    return <>
        <canvas
            ref={canvasRef}
            style={
                {
                    width: `${20}vw`,
                    height: `${10}vw`,
                    marginLeft: `${0.04}vw`}
            }
        />
    </>;
};

export default AnimatedBlockWave;
