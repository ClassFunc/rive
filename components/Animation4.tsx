"use client"
import React, { useState, useEffect, useRef } from 'react';
import {useRive, useStateMachineInput} from '@rive-app/react-canvas';

export const Animation4 = () => {
    const [number, setNumber] = useState(0);
    const {rive, RiveComponent} = useRive({
        src: '/rive/bingo.riv',
        artboard: 'mouth',
        stateMachines: "StateMachine1",
        autoplay: true,
    });
    const rating = useStateMachineInput(rive, "StateMachine1", "Number1");


    useEffect(() => {
        if(rive && rating){
            rating.value=number
            console.log(rive.contents)
        }
    }, [number]);
    

    return (
        <div className={`w-full h-[50vh] flex flex-col justify-center items-center`}>
            <input type={'number'} min={0} max={6} value={number} onChange={(e) => setNumber(Number(e.target.value))}/>
            <RiveComponent
                className={`w-full h-[50vh]`}
            />
        </div>
    );
};