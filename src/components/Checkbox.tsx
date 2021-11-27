import React, {useEffect, useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

interface Props {
    label: string
    onCheckChanged?: (param: boolean)=> void
    value?: boolean
}

function Checkbox({label, onCheckChanged, value=false}: Props) {
    const [check, setCheck] = useState(false);

    const onClickCheckbox = (e: React.MouseEvent<HTMLDivElement>)=>{
        if(onCheckChanged){
            onCheckChanged(!check);
        }
        setCheck(pre => !pre);
    }

    useEffect(()=> {
        setCheck(value);
    }, [value]);

    return (
        <div css={style} className={check ? 'sel' : ''} onClick={onClickCheckbox}>
            <div className='box'></div>
            <div className='label'>{label}</div>
        </div>
    );
}

const style = css`
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    transition: .3s;
    &:hover, &.sel {
        & .box {
            border-color: var(--dodgeblue_50);
        }
        .label {
            color: var(--slategray_90);
        }
    }
    &.sel {
        .box::before {
            opacity: 1;
        }
    }
    .box {
        position: relative;
        width: 18px;
        height: 18px;
        margin-right: 6px;
        border: 1px solid var(--gray_20);
        border-radius: 1px;
        transition: .3s;
        &::before {
            opacity: 0;
            transition: .3s;
            position: absolute;
            left: 0;
            content: '✔';
            color: white;
            text-align: center;
            line-height: 16px;
            width: 18px;
            height: 18px;
            background-color: var(--dodgeblue_50);
            border-radius: 1px;
        }
   }
   .label {
       font-size: 13px;
       font-weight: bold;
       color: var(--slategray_60);
   }
`;

export default Checkbox;
