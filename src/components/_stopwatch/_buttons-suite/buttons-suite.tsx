import React, { MouseEventHandler } from 'react';

interface IProps {
    suite: { onClick: MouseEventHandler<HTMLButtonElement>, title: string, ref?: React.RefObject<any>, style?: React.CSSProperties }[];
}

const ButtonsSuite = (props: IProps) => {
    return (
        <div>
            {props.suite.map(x =>
                <button
                    key={x.title}
                    ref={x.ref}
                    style={x.style}
                    type={'button'}
                    onClick={x.onClick}
                >
                    {x.title}
                </button>
            )}
        </div>
    );
}

export { ButtonsSuite };
