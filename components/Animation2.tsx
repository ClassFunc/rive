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
    // const bumpInput = useStateMachineInput(rive, "StateMachine1", "Number1", true);
    // console.log(input)

    return (
        <RiveComponent
            className={`w-full h-[50vh]`}
            onClick={() => {
                console.log(rive?.contents)
                console.log(rive?.activeArtboard)
                console.log(rive?.playingAnimationNames)
                console.log(rive?.playingStateMachineNames)
                rive?.setNumberStateAtPath('Number1', 3, 'mouth')
                setInput(prevState => prevState + 1)
            }}
        />
    );
}