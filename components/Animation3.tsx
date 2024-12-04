"use client"
import React, {useState} from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export const Animation3 = () => {
    const [playing, setPlaying] = useState<boolean>(false)
    const { rive, RiveComponent } = useRive({
        src: '/rive/abu.riv',
        artboard:'Abu',
        animations:['nhaymat'],
        autoplay: true,
    });

    return (
        <RiveComponent
            className={`w-full h-[50vh]`}
            onClick={() => {
                if(playing){
                    rive?.pause()
                }else {
                    rive?.play()
                }
                setPlaying(!playing)
            }}
        />
    );
}