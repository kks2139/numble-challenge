import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

interface Props {
    children?: JSX.Element     
    color?: string;
    title: string
}

function Icon({children, color='blue', title}: Props) {
    return (
        <div css={style(color)}>
            {children}
            <div className='title'>{title}</div>
        </div>
    );
}

const style = (bg: string)=> (css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    background-color: ${bg};  
    border-radius: 40%;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    .title {
        font-size: 13px;
        font-weight: normal;
        position: absolute;
        text-align: center;
        color: black;
        width: 100px;
        transform: translateY(38px);
    }
`);

export default Icon;
