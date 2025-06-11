import React, {createContext, useContext, useMemo, useState} from 'react';

type ContextColorType = {
    color: string,
    changeColor(change: string): void,
}

const ContextColorDefault: ContextColorType = {
    color: "LIGHT",
    changeColor(change: string) {}
}

const ContextColorProvider = createContext<ContextColorType>(ContextColorDefault);

export const useContextColor = () => {
    return useContext(ContextColorProvider);
}

function ContextColor(props: { children: any }) {

    const [color, setColor] = useState<string>("LIGHT");


    const SynthColorValues = useMemo<ContextColorType>(() => (
        {
            color: color,
            changeColor(change: string) {
                console.log(change)
                setColor(change)
            }
        }
    ), [color]);

    return (
        <ContextColorProvider.Provider value={SynthColorValues}>
            {props.children}
        </ContextColorProvider.Provider>
    );
}

export default ContextColor;
