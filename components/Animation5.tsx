"use client"
import React, {useEffect, useState} from 'react';
import {Rive, useRive, useStateMachineInput} from '@rive-app/react-canvas';
import {UseRiveParameters} from "@rive-app/react-canvas/dist/types/types";

export const Animation5 = () => {
    // const [mainValue, setMainValue] = useState(0);
    const [mainValue, setMainValue] = useState(0);

    const {rive: riveMain, RiveComponent: MainComp} = useRive(getBingoRiveConfig('Main'));
    const smMain = useStateMachineInput(riveMain, "State_Machine_1", "Number_A");
    const {rive: riveMouth, RiveComponent: MouthComp} = useRive(getBingoRiveConfig('mouth'));

    useEffect(() => {
        riveLogger({rive: riveMain})
    }, [riveMain]);

    useEffect(() => {
        if (smMain) {
            smMain.value = mainValue
            riveMain?.setNumberStateAtPath('Number_B', mainValue, 'mouth')
        }
    }, [mainValue, smMain]);

    return (
        <div className={`w-full h-[50vh] flex flex-col justify-center items-center`}>
            <MainComp
                className={`w-full h-[50vh]`}
            />
            <input type={'number'}
                   className={'text-black p-3 m-3'}
                   min={0}
                   max={riveMouth?.animationNames.length}
                   value={mainValue}
                   onChange={(e) => setMainValue(Number(e.target.value))}/>
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
    console.log('artboardName:', rive.activeArtboard)
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