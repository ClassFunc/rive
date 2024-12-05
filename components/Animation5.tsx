"use client"
import React, {useEffect, useState} from 'react';
import {EventType, Rive, RiveEventType, useRive, UseRiveParameters, useStateMachineInput} from '@rive-app/react-canvas';

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

    const onRiveEventReceived = (riveEvent: any) => {
        const eventData = riveEvent.data;
        if (!eventData) {
            return;
        }
        const eventProperties = eventData.properties;
        if (eventData.type === RiveEventType.General) {
            console.log("Event name", eventData.name);
            // Added relevant metadata from the event
            console.log("Rating", eventProperties.rating);
            console.log("Message", eventProperties.message);
        } else if (eventData.type === RiveEventType.OpenUrl) {
            console.log("Event name", eventData.name);
            // Handle OpenUrl event manually
            // window.location.href = data.url;
        }
    };

    // Wait until the rive object is instantiated before adding the Rive
    // event listener
    useEffect(() => {
        if (riveMain) {
            riveMain.on(EventType.RiveEvent, onRiveEventReceived);
        }
    }, [riveMain]);

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