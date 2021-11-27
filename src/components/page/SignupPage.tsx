import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const onClickSignup = ()=>{
        setShowForm(true);
    }

    const onClickLogin = ()=>{
        navigate('/login');
    }

    return (
        <div css={style}>
            <div className='header'>
                <Link to='/'>RIDIBOOKS</Link>
            </div>
            <div className='content'>
                <img src='book.png'></img>
                <div className='button-box'>
                    <div className='main-button-blue nohover' onClick={onClickSignup}>일반 회원가입</div>
                    <div className='sub-button-white nohover' onClick={onClickLogin}>로그인</div>
                </div>
            </div>
        </div>
    );
}

const style = css`
    --width: 338px;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width:  100vw;
    height: 100vh;
    background-color: var(--dodgeblue_5);
    .header {
        height: 42px;
        border-bottom: 1px solid var(--bluegray_10);
        display: flex;
        justify-content: center;
        align-items: center;
        a {
            font-size: 18px;
            font-weight: 800; 
            color: var(--dodgeblue_50);
            transform: scale(0.85, 1);
            cursor: pointer;
            padding: 5px 10px;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 104px;
        img {
            width: 280px;
            height: 212px;
            margin: 20px;
            object-fit: contain;
        }
        .button-box {
            width: var(--width);
            display: flex;
            flex-direction: column;
            align-items: center;
            > div {
                display: flex;
                justify-content: center;
                width: 100%;
                height: 50px;
                font-size: 16px;
                margin-top: 10px;
                &[class*='main-'] {
                    box-shadow: 0 2px 4px 0 rgb(31 140 230 / 30%);
                }
                &[class*='sub-'] {
                    box-shadow: 0 2px 4px 0 rgb(209 213 217 / 30%);
                }
            }
        }
    }
`;

export default SignupPage;
