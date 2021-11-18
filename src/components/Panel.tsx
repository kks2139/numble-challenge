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
    > .title {
        display: flex;
        width: 1000px;
        font-size: 19px;
        &::after {
            content: '›';
            margin-left: 10px;
            transform: scale(1.9, 2.1);
            line-height: 20px;
        }
    }
    > .content {
        padding: 10px 0 0 0;
    }
`;

export default Panel;
