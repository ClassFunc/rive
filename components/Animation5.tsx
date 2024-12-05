"use client"
import React, {useEffect, useState} from 'react';
import {Rive, useRive, useStateMachineInput} from '@rive-app/react-canvas';
import {UseRiveParameters} from "@rive-app/react-canvas/dist/types/types";

export const Animation5 = () => {


    // const [mainValue, setMainValue] = useState(0);
    const [mainValue, setMainValue] = useState(0);
    const [mouthValue, setMouthValue] = useState(0);

    const {rive: riveMain, RiveComponent: MainComp} = useRive(getBingoRiveConfig('Main'));
    const smMain = useStateMachineInput(riveMain, "State_Machine_1", "Number_A");

    const {rive: riveMouth, RiveComponent: MouthComp} = useRive(getBingoRiveConfig('mouth'));
    const smMouth = useStateMachineInput(riveMouth, "State_Machine_1", "Number_B");


    useEffect(() => {
        riveLogger({rive: riveMain})
        riveLogger({rive: riveMouth})
    }, [riveMain, riveMouth]);

    useEffect(() => {
        if (smMain) {
            smMain.value = mainValue
        }
    }, [mainValue, smMain]);

    useEffect(() => {
        if (smMouth) {
            smMouth.value = mouthValue
        }
    }, [mouthValue, smMouth]);

    return (
        <div className={`w-full h-[50vh] flex flex-col justify-center items-center`}>
            <MainComp
                className={`w-full h-[50vh]`}
            />
            <input type={'number'}
                   className={'text-black p-3 m-3'}
                   min={0}
                   max={riveMain?.animationNames.length}
                   value={mainValue}
                   onChange={(e) => setMainValue(Number(e.target.value))}/>

            <input type={'number'}
                   className={'text-black p-3 m-3'}
                   min={0}
                   max={riveMouth?.animationNames.length}
                   value={mouthValue}
                   onChange={(e) => setMouthValue(Number(e.target.value))}/>
            <MouthComp
                className={`w-full h-[50vh]`}
            />
        </div>
    );
};

const getBingoRiveConfig =
    (artboard: string, stateMachines?: string | string[], autoplay?: boolean): UseRiveParameters => {
        return {
            src: '/rive/bingo.riv',
            artboard: artboard,
            stateMachines: stateMachines || ['State_Machine_1'],
            autoplay: autoplay ?? true,
        }
    }

const riveLogger = ({rive}: {
    rive?: Rive | undefined | null
}) => {
    if (!rive) {
        return;
    }

    console.group();
    console.log('animationNames:', rive.animationNames)
    console.log(`stateMachineNames: (${rive.stateMachineNames.length})`, rive.stateMachineNames,)
    for (const sn of rive.stateMachineNames) {
        console.log(
            `'${sn}'` + `__inputs`,
            rive.stateMachineInputs(sn)?.map(i => {
                return {name: i.name, type: i.type, value: i.value};
            })
        )

    }
    console.groupEnd()
}