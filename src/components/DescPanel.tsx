import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BsClockFill} from 'react-icons/bs';

interface Props {
    title: string
    summary?: string
    desc?: string
    showSpread?: boolean
    children?: JSX.Element
}

function DescPanel({title, summary='', desc='', showSpread=false, children}: Props) {
    const [spread, setSpread] = useState(false);

    const onClickSpread = ()=>{
        setSpread(!spread);
    }

    return (
        <div css={style(spread)}>
            <div className='title'>{title}</div>
            <div className='content'>
                {summary ? <>{summary} <br/><br/></> : null}
                {desc}
                {children}
                {showSpread ? <div className='spread' onClick={onClickSpread}>{spread ? '접기' : '펼쳐보기'}</div> : null}
            </div>
        </div>
    );
}

const style = (spread: boolean)=> (css`
    width: 100%;
    margin-bottom: 50px;
    .title {
        width: 100%;
        padding: 5px 0;
        font-size: 20px;
        font-weight: bold;
        color: var(--bluegray_40);
        border-bottom: 2px solid var(--bluegray_40);
    }
    .content {
        width: 100%;
        min-height: 180px;
        // ${spread ? '' : 'height: 180px;'}
        font-size: 13px;
        color: var(--gray_80);
        padding: 12px 0 0 0;
        line-height: 22px;
        .spread {
            font-size: 13px;
            color: var(--dodgeblue_60);
            text-align: right;
            margin-right: 15px;
            cursor: pointer;
            &::after {
                position: absolute;
                content: '^';
                font-weight: bold;
                color: white;
                text-align: center;
                line-height: 17px;
                background-color: var(--dodgeblue_60);
                width: 13px;
                height: 13px;
                border-radius: 50%;
                transform: translate(2px, 4px) rotate(${spread ? '0' : '180deg'});
            }
        }
    }
`);

export default DescPanel;
