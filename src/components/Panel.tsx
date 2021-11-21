import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BsClockFill} from 'react-icons/bs';

interface Props {
    title: string
    children: JSX.Element
    dark?: boolean
    titleLink?: boolean
    label?: string
}

function Panel({title, children, dark=false, titleLink=true, label}: Props) {
    return (
        <div css={style(dark, titleLink)}>
            <div className='label-box'>
                {label ? <div className='colorful-label'>
                    <BsClockFill size='15'/>
                    {label}
                </div> : null}
            </div>
            <div className='title'>{title}</div>
            <div className='content'>
                {children}
            </div>
        </div>
    );
}

const style = (dark: boolean, titleLink: boolean)=> (css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .label-box {
        display: flex;
        width: 1000px;
        margin-bottom: 10px;
        .colorful-label {
            display: flex;
            align-items: center;
            background-image: linear-gradient(255deg, #0077d9 4%, #72d2e0);
            border-radius: 30px;
            font-size: 13px;
            font-weight: bold;
            color: white;
            padding: 8px;
            svg {
                margin-right: 6px;
            }
        }
    }
    ${dark ? 'padding: 31px 0 36px 0;' : 'padding: 24px 0;'}
    > .title {
        display: flex;
        width: 1000px;
        font-size: 19px;
        ${dark ? 'color: white;' : ''}
        ${titleLink ? `
            cursor: pointer;
            &::after {
                content: '›';
                margin-left: 10px;
                transform: scale(1.5, 2.1);
                line-height: 20px;
            }
        ` : ''}
    }
    > .content {
        padding: 10px 0 0 0;
    }
    ${dark ? 'background-color: rgb(10,39,67,0.9);' : ''}
`);

export default Panel;
