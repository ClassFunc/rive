"use client"
import React, {useState} from 'react';
import {useRive, UseRiveParameters} from '@rive-app/react-canvas';
import {hyphenate as hyphenateEn} from "hyphen/en";
import {charToMouthState} from "@/utils/stateMachine";

export const Animation5 = () => {
    const [text, setText] = useState('A certain king had a beautiful garden');
    const [isPlaying, setIsPlaying] = useState(false);
    const {rive: riveMain, RiveComponent: MainComp} = useRive(getBingoRiveConfig('Main'));

    const handlePlay = async () => {
        if (isPlaying) return;
        setIsPlaying(true);

        // thêm chuyển động khi bắt đầu đọc
        riveMain?.play('Chop_mat');
        riveMain?.play('Gat_dau');

        const mouthStates = await textToMouthStates(text, charToMouthState);

        let index = 0;

        const interval = setInterval(() => {
            if (index < mouthStates.length) {
                // chuyển động môi
                riveMain?.setNumberStateAtPath('Number_B', mouthStates[index], 'mouth');
                index++;
            } else {
                clearInterval(interval);
                //reset về miệng default
                riveMain?.setNumberStateAtPath('Number_B', 0, 'mouth');
                setIsPlaying(false);
                riveMain?.pause();
            }
        }, 300);
    };

    // useEffect(() => {
    //     riveLogger({rive: riveMain})
    // }, [riveMain]);

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

const textToMouthStates = async (text: string, charToMouthState: Record<string, number>): Promise<number[]> => {
    // tách nguyên âm theo các từ của câu
    const hyphenatedText = await hyphenateEn(text, { hyphenChar: '-' });

    const words = hyphenatedText.split(' ');
    const states: number[] = [];

    for (const word of words) {
        const syllables = word.split('-');

        for (const syllable of syllables) {
            for (const key of Object.keys(charToMouthState)) {
                if (syllable.toLowerCase().includes(key)) {
                    states.push(charToMouthState[key]);
                    // matched = true;
                    break;
                }
            }
        }
    }

    return states;
}

// const riveLogger = ({rive}: {
//     rive?: Rive | undefined | null
// }) => {
//     if (!rive) {
//         return;
//     }
//     console.group();
//     console.log('artboardName:', rive.activeArtboard)
//     console.log('animationNames:', rive.animationNames)
//     console.log(`stateMachineNames: (${rive.stateMachineNames.length})`, rive.stateMachineNames,)
//     for (const sn of rive.stateMachineNames) {
//         console.log(
//             `'${sn}'` + `__inputs`,
//             rive.stateMachineInputs(sn)?.map(i => {
//                 return {name: i.name, type: i.type, value: i.value};
//             })
//         )
//
//     }
//     console.groupEnd()
// }