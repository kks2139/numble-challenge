import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

interface Props {
    direction: 'left' | 'right'
    type?: 'dark' | 'light' | ''
    onMoveButtonClick?: (param: 'left' | 'right')=>void 
}

function SliderMoveButton({direction, type='', onMoveButtonClick}: Props) {
    const onClick = ()=>{
        if(onMoveButtonClick) onMoveButtonClick(direction);
    }

    return (
        <div css={style} className={`${type} ${direction} nodrag`} data-left onClick={onClick}>
            <div>{direction === 'left' ? '‹' : '›'}</div>
        </div>
    );
}

const style = css`
    text-align: center;
    line-height: 31px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgb(255,255,255,0.9);
    box-shadow: 0 3px 8px -5px black;
    transition: .2s;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
    }
    div {
        font-size: 26px;
        color: var(--gray_40);
        transform: scale(1.2, 1.5);
        transition: .2s;
    }
    &.left {
        transform: translateX(-30%);
    }
    &.right {
        transform: translateX(30%);
    }
    &.dark {
        background-color: var(--slategray_70);
        div {
            color: var(--gray_30);
        }
    }
    &.light {
        opacity: 0.6;
        &:hover {
            opacity: 0.9;
        }
    }
`;

export default SliderMoveButton;
