"use client"
import React, {useEffect, useState} from 'react';
import {Rive, useRive, UseRiveParameters} from '@rive-app/react-canvas';
import Anthropic from "@anthropic-ai/sdk";

const charToMouthState: { [key: string]: number } = {
    neutral: 0,
    ah: 1,
    d: 2,
    ee: 3,
    f: 4,
    l: 5,
    m: 6,
    oh: 7,
    r: 8,
    s: 9,
    uh: 10,
    woo: 11,
};

const textToMouthStates = (text: string): number[] => {
    const simplifiedText = text.toLowerCase().replace(/[^a-z\s]/g, '');
    const states: number[] = [];
    for (const char of simplifiedText) {
        const key = char === ' ' ? 'neutral' : char;
        if (charToMouthState[key] !== undefined) {
            states.push(charToMouthState[key]);
        }
    }
    return states;
};

export const Animation5 = () => {
    const [text, setText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const { rive: riveMain, RiveComponent: MainComp } = useRive(getBingoRiveConfig('Main'));

    useEffect(() => {
        riveLogger({rive: riveMain})
    }, [riveMain]);

    const handlePlay = () => {
        if (isPlaying) return;
        setIsPlaying(true);
        riveMain?.play('Chop_mat')
        const mouthStates = textToMouthStates(text);
        console.log(mouthStates)
        let index = 0;

        const interval = setInterval(() => {
            if (index < mouthStates.length) {
                console.log(mouthStates[index])
                riveMain?.setNumberStateAtPath('Number_B', mouthStates[index], 'mouth')
                index++;
            } else {
                clearInterval(interval);
                riveMain?.setNumberStateAtPath('Number_B', 0, 'mouth');
                setIsPlaying(false);
                riveMain?.pause()
            }
        }, 300);
    };



    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const anthropic = new Anthropic({
                    dangerouslyAllowBrowser: true,
                    apiKey: "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",
                });

                const msg = await anthropic.messages.create({
                    model: "claude-3-5-sonnet-20241022",
                    max_tokens: 1000,
                    temperature: 0,
                    system: "xin chào",
                    messages : [
                        { role: "user", content: "Hôm nay thời tiết như thế nào?" },
                    ]
                });
                console.log(msg);
            } catch (err) {
                console.error("Error:", err);
            }
        };

        fetchResponse().then();
    }, []);




    return (
        <div className={`w-full h-[50vh] flex flex-col justify-center items-center`}>
            <MainComp
                className={`w-full h-[50vh]`}
            />
            <input
                type="text"
                className="text-black p-3 m-3"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isPlaying}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handlePlay}
                disabled={isPlaying || !text.trim()}
            >
                {isPlaying ? 'Playing...' : 'Play'}
            </button>
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