import React from 'react';

interface IProps {
    seconds: number;
}

const TimeFormater = (props: IProps) => {
    let formatedTime = '';

    const currHours = Math.floor(props.seconds / 3600);
    formatedTime += currHours.toLocaleString(undefined, { useGrouping: false, minimumIntegerDigits: 2 }) + ':';

    const currMinutes = Math.floor((props.seconds - currHours * 3600) / 60);
    formatedTime += currMinutes.toLocaleString(undefined, { useGrouping: false, minimumIntegerDigits: 2 }) + ':';

    const currSeconds = Math.floor(props.seconds - (currHours * 3600 + currMinutes * 60));
    formatedTime += currSeconds.toLocaleString(undefined, { useGrouping: false, minimumIntegerDigits: 2 });

    return (
        <div>
            {formatedTime}
        </div>
    );
}

export { TimeFormater };
