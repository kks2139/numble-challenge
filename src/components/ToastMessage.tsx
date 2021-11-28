import React, { useEffect, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {MessageInfo} from '../utils/interfaces';
import {AiFillCheckCircle, AiFillExclamationCircle} from 'react-icons/ai';
import {IoIosClose} from 'react-icons/io';

interface Props {
    msg: string
    warn?: boolean
    link?: string
    linkCallback?: ()=> void
    onRemove: ()=> void
}

function ToastMessage({msg, warn, link, linkCallback, onRemove}: Props) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const timer = useRef(0);

    const removeMsg = ()=>{
        onRemove();
    }

    const onClickLink = ()=>{
        if(linkCallback){
            linkCallback();
        }
    }
    
    useEffect(()=>{
        timer.current = window.setTimeout(()=>{
            removeMsg();
        }, 3000);
        return ()=> {
            clearInterval(timer.current);
        }
    }, []);

    return (
        <div css={style} ref={divRef}>
            <div className='msg-box'>
                <div className={`msg ${warn ? 'warn' : ''}`}>
                    {warn ? <AiFillExclamationCircle/> : <AiFillCheckCircle/>}
                    {msg}
                </div>
                {link ? <div className='link' onClick={onClickLink}>{link}</div> : null}
            </div>
            <div className='close' onClick={removeMsg}><IoIosClose size='40'/></div>
        </div>
    );
}

const style = css`
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 450px;
    background-color: var(--slategray_100);
    box-shadow: 0 3px 7px -3px black;
    padding: 3px 0px 3px 15px;
    border-radius: 5px;

    animation-name: showAndHide;
    animation-duration: 3.2s;
    animation-timing-function: ease;

    .msg-box {
        display: flex;
        font-size: 14px;
        .msg {
            display: flex;
            align-items: center;
            color: var(--green_30);
            svg {
                margin-right: 5px;
            }
        }
        .warn {
            color: var(--red_20);
        }
        .link {
            font-weight: bold;
            color: white;
            margin-left: 10px;
            cursor: pointer;
            transition: .2s;
            &:hover {
                &::after {
                    transform: translate(5px, -2px);
                }
            }
            &::after {
                position: absolute;
                content: '»';
                margin-left: 5px;
                transition: .3s;
                transform: translateY(-2px);
            }
        }
    }
    .close {
        display: flex;
        align-items: center;
        svg {color: var(--gray_50);
        cursor: pointer;
    }

    .hide {
        transition: .5s;
        top: 0;
        opacity: 0;
    }

    @keyframes show {
        0% {
            opacity: 0;
            top: 0;
        }
        50% {
            opacity: .2;
        }
        100% {
            opacity: 1;
            top: 70px;
        }
    }
    
    @keyframes showAndHide {
        0% {
            opacity: 0;
            top: 20px;
        }
        20% {
            opacity: 1;
            top: 70px;
        }

        80% {
            opacity: 1;
            top: 70px;
        }
        100% {
            opacity: 0;
            top: 20px;
        }
    }
`;

export default ToastMessage;
