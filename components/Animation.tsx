"use client"
import React, { useState } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export const Animation = () => {
    const [input, setInput] = useState<number>(1)
    const [isPlaying, setIsPlaying] = useState(false);
    const { rive, RiveComponent } = useRive({
        src: '/rive/ver.riv',
        stateMachines: "bumpy",
        autoplay:false,
        artboard: 'Truck',
    });
    const bumpInput = useStateMachineInput(rive, "bumpy", "bump");

    return (
        <RiveComponent
            className={`w-full h-[50vh]`}
            onMouseMove={()=>{rive?.play()}}
            onMouseLeave={()=>{rive?.pause()}}
            onClick={() => {
                console.log(rive?.contents)
                bumpInput && bumpInput.fire()
            }}
        />
    );
}