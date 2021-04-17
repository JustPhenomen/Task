import React, { useEffect, useRef, useState } from 'react';
import { interval, fromEventPattern, } from 'rxjs';
import { bufferCount, filter, map, take } from 'rxjs/operators';
import { ButtonsSuite } from './_buttons-suite/buttons-suite';
import { TimeFormater } from './_time-formater/time-formater';

const ticker = interval(1000);

const Stopwatch = () => {
    const [seconds, setSeconds] = useState(0);
    const [isStoped, setIsStoped] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);

    const waitBtnClick = fromEventPattern(
        handler => ref.current?.addEventListener('click', handler),
        handler => ref.current?.removeEventListener('click', handler),
    ).pipe(
        map(() => new Date().getTime()),
        bufferCount(2, 1),
        filter((timestamp) => {
            return timestamp[0] > new Date().getTime() - 300;
        })
    );

    useEffect(() => {
        const subscription = ticker.subscribe(() => {
            if (!isStoped) {
                setSeconds(val => val + 1);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    });

    const handleSwitch = () => {
        setIsStoped(val => !val);

        if (!isStoped) {
            setSeconds(0);
        }
    }

    const handleReset = () => {
        setSeconds(0);
        setIsStoped(false);
    }

    const handleWait = () => {
        waitBtnClick.pipe(take(1))
            .subscribe(() => setIsStoped(true));
    }

    return (
        <div>
            <TimeFormater seconds={seconds} />
            <ButtonsSuite
                suite={[
                    { onClick: handleSwitch, title: (!isStoped ? 'Stop' : 'Start') },
                    { onClick: handleReset, title: 'Reset' },
                    { onClick: handleWait, title: 'Wait', ref: ref }
                ]}
            />
        </div>
    )
}

export { Stopwatch };
