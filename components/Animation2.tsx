"use client"
import React, {useState} from 'react';
import {useRive, useStateMachineInput} from '@rive-app/react-canvas';

export const Animation2 = () => {
    const [input, setInput] = useState<string>('default')
    const {rive, RiveComponent} = useRive({
        src: '/rive/bingo.riv',
        stateMachines: "State_Machine_1",
        autoplay: false,
        artboard: 'Main',
    });
    return (
        <div className={`w-full h-[50vh] flex flex-col justify-center items-center`}>
            <div className={`w-full  flex gap-2 justify-center items-center`}>
                <input className={`border w-3/4 rounded-md p-2`} value={input} onChange={(event) => {
                    setInput(e => event.target.value)
                }}/>
                <button className={`bg-gray-400 p-2 rounded-md`}
                        onClick={() => {
                            if(rive){
                                rive.play(`${input}`)
                        }}}>
                    Play
                </button>
            </div>
            <RiveComponent
                className={`w-full h-[50vh]`}
            />
        </div>
    );
}