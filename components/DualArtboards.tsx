'use client'

import React from "react";

import {useRive} from "@rive-app/react-canvas";

export const DualArtboards = () => {

    const {RiveComponent} = useRive({
        src: '/rive/bingo.riv',
        artboard: 'Main',
        stateMachines: ["State_Machine_1"],
        autoplay: true,
    });

    return (
        <div className={'flex items-center justify-center w-1/2 h-1/2'}>
            {/* Artboard chính */}
            <RiveComponent/>

            {/* Nested Artboard */}
            {/*<RiveComponent/>*/}
        </div>
    );
};
