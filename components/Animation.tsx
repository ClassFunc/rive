"use client"
import React, { useState } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export const Animation = () => {
    const { rive, RiveComponent } = useRive({
        src: '/rive/ver.riv',
        stateMachines: "bumpy",
        autoplay:true,
        artboard: 'Truck',
    });
    const bumpInput = useStateMachineInput(rive, "bumpy", "bump");

    return (
        <RiveComponent
            className={`w-full h-[50vh]`}
            onClick={() => {
                console.log(rive?.contents)
                bumpInput && bumpInput.fire()
            }}
        />
    );
}