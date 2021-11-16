import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

interface Props {
    title: string
    children: JSX.Element
}

function Panel({title, children}: Props) {
    return (
        <div css={style}>
            <div className='title'>{title}</div>
            <div className='content'>
                {children}
            </div>
        </div>
    );
}

const style = css`
    padding: 24px 0;
    .title {
        border: var(--test);
        width: 1000px;
        font-size: 19px;
    }
    .content {
        border: var(--test);
    }
`;

export default Panel;
