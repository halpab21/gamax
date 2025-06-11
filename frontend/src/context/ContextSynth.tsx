import React, {createContext, useContext, useMemo, useState} from 'react';

type ContextSynthType = {
    color: string,
    changeColor(change: string): void,
    amplitude1: number,
    changeAmplitude1(change: number): void,
    amplitude2: number,
    changeAmplitude2(change: number): void,
    amplitude3: number,
    changeAmplitude3(change: number): void
}

const ContextSynthDefault: ContextSynthType = {
    color: "#8C8079",
    changeColor(change: string) {},
    amplitude1: 20,
    changeAmplitude1(change: number) {},
    amplitude2: 30,
    changeAmplitude2(change: number) {},
    amplitude3: 40,
    changeAmplitude3(change: number) {}
}

const ContextSynthProvider = createContext<ContextSynthType>(ContextSynthDefault);

export const useContextSynth = () => {
    return useContext(ContextSynthProvider);
}

function ContextSynth(props: { children: any }) {

    const [color, setColor] = useState<string>("#8C8079");
    const [amplitude1, setAmplitude1] = useState<number>(0);
    const [amplitude2, setAmplitude2] = useState<number>(0);
    const [amplitude3, setAmplitude3] = useState<number>(0);

    const GameContextValues = useMemo<ContextSynthType>(() => (
        {
            color: color,
            changeColor(change: string) {
                setColor(change)
            },
            amplitude1: amplitude1,
            changeAmplitude1(change: number) {
                setAmplitude1(change)
            },
            amplitude2: amplitude2,
            changeAmplitude2(change: number) {
                setAmplitude2(change)
            },
            amplitude3: amplitude3,
            changeAmplitude3(change: number) {
                setAmplitude3(change)
            }
        }
    ), [color, amplitude1, amplitude2, amplitude3]);

    return (
        <ContextSynthProvider.Provider value={GameContextValues}>
            {props.children}
        </ContextSynthProvider.Provider>
    );
}

export default ContextSynth;
