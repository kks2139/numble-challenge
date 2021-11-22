import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BsClockFill} from 'react-icons/bs';

interface Props {
    title: string
    summary?: string
    desc?: string
    children?: JSX.Element
}

function DescPanel({title, summary='', desc='', children}: Props) {
    const [spread, setSpread] = useState(false);

    const onClickSpread = ()=>{
        setSpread(!spread);
    }

    return (
        <div css={style(spread)}>
            <div className='title'>{title}</div>
            <div className='content'>
                {summary}<br/><br/>
                {desc}
                {children}
                <div className='spread' onClick={onClickSpread}>펼쳐보기</div>
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
        ${spread ? 'height: 100%;' : 'height: 180px;'}
        font-size: 13px;
        color: var(--gray_80);
        padding: 20px 0 0 0;
        line-height: 22px;
        .spread {

        }
    }
`);

export default DescPanel;
