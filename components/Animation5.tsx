"use client"
import React, {useState, useEffect, useRef} from 'react';
import {useRive, useStateMachineInput} from '@rive-app/react-canvas';

export const Animation5 = () => {
    const [number, setNumber] = useState(0);
    const {rive: riveMain, RiveComponent} = useRive({
        src: '/rive/bingo.riv',
        artboard: 'Main',
        stateMachines: ["State_Machine_1"],
        autoplay: true,
    });
    const smMain = useStateMachineInput(riveMain, "State_Machine_1", "Number_A");

    const {rive: riveMouth, RiveComponent: RiveComponent2} = useRive({
        src: '/rive/bingo.riv',
        artboard: 'mouth',
        stateMachines: ["State_Machine_1"],
        autoplay: true,
    });
    const smMouth = useStateMachineInput(riveMouth, "State_Machine_1", "Number_B");


    useEffect(() => {
        console.log({riveMain, smMain})
        if (riveMain && smMain) {
            smMain.value = number
        }
    }, [number, riveMain]);

    useEffect(() => {
        console.log({riveMouth, smMouth})
        if (riveMouth && smMouth) {
            smMouth.value = number
        }
    }, [number, riveMouth]);


    return (
        <div className={`w-full h-[50vh] flex flex-col justify-center items-center`}>
            <input type={'number'} min={0} max={20} value={number} onChange={(e) => setNumber(Number(e.target.value))}/>
            <RiveComponent
                className={`w-full h-[50vh]`}
            />
            <RiveComponent2
                className={`w-full h-[50vh]`}
            />
        </div>
    );
};