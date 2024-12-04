"use client"
import React, {useState} from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export const Animation2 = () => {
    const [input, setInput] = useState(0)
    const [playing, setPlaying] = useState<boolean>(false)
    console.log(input)
    const { rive, RiveComponent } = useRive({
        src: '/rive/bingo.riv',
        stateMachines: "StateMachine1",
        autoplay:false,
        artboard: 'mouth',
        onStateChange:((event)=>{
        })
    });
    const bumpInput = useStateMachineInput(rive, "StateMachine1", "Number1");

    return (
        <RiveComponent
            className={`w-full h-[50vh]`}
            onClick={() => {
                if(rive){
                    bumpInput && bumpInput.fire()
                    console.log(rive.contents)
                    // rive.play('StateMachine1', true)
                    // rive.setNumberStateAtPath('Number1',input,'mouth')
                    // console.log(rive.contents.artboards)
                    // console.log(rive.playingStateMachineNames)
                    setInput(prevState => prevState+1)
                    // rive.setNumberStateAtPath()
                }
                // if(playing){
                //     rive?.pause()
                // }else {
                //     rive?.play()
                // }
                // setPlaying(!playing)
            }}
        />
    );
}