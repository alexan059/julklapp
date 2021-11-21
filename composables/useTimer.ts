import { useState } from '#app';

type TimerFinishedCallback = () => void;

export default function () {

    const time = useState<number>('timer', () => 0);
    let interval = null;

    const startTimer = (seconds: number, finishedCallback: TimerFinishedCallback) => {
        time.value = seconds;
        interval = setInterval(() => {
            if (time.value-- <= 1) {
                clearInterval(interval);
                finishedCallback();
            }
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(interval);
        time.value = 0;
    };

    return [time, startTimer, stopTimer];
}