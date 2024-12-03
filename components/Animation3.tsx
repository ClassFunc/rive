"use client"
import React, {useState} from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export const Animation3 = () => {
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
                console.log(rive?.contents)
            }}
        />
    );
}