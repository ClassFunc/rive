"use client"
import React, {useState} from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export const Animation2 = () => {
    const [input, setInput] = useState(0)
    const { rive, RiveComponent } = useRive({
        src: '/rive/bingo.riv',
        stateMachines: "StateMachine1",
        autoplay:false,
        artboard: 'mouth',
        onStateChange:((event)=>{
                // console.log(event?.data[0])
        })
    });
    const bumpInput = useStateMachineInput(rive, "StateMachine1", "Number1", input);
    console.log(input)

    return (
        <RiveComponent
            className={`w-full h-[50vh]`}
            // onMouseMove={()=>{rive?.play()}}
            // onMouseLeave={()=>{rive?.pause()}}
            onClick={() => {
                console.log(rive?.contents)
                setInput(prevState => prevState + 1)
                bumpInput && bumpInput.fire()
            }}
        />
    );
}