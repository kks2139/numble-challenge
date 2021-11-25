import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Link} from 'react-router-dom';

function LoginPage() {
    const [inputs, setInputs] = useState({
        id: '',
        pw: '',
    }); 

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.currentTarget;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onCheckboxClick = (e: React.MouseEvent<HTMLDivElement>)=>{
        const box = e.currentTarget.querySelector('.box');
        box?.classList.toggle('sel');
    }

    return (
        <div css={style}>
            <div className='header'>
                <Link to='/'>RIDIBOOKS</Link>
            </div>
            <div className='content'>
                <div className='form-box'>
                    <div className='row'>
                        <input name='id' autoComplete='off' placeholder='아이디' value={inputs.id} onChange={onChange}></input>
                    </div>
                    <div className='row'>
                        <input name='pw' autoComplete='off' placeholder='비밀번호' type='password' value={inputs.pw} onChange={onChange}></input>
                    </div>
                    <div className='row'>
                        <div className='checkbox' onClick={onCheckboxClick}>
                            <div className='box'></div>
                            <span>로그인 상태 유지</span>
                        </div>
                        <div className='find'>
                            <div className='txt'>아이디 찾기</div>
                            <div className='txt'> 비밀번호 재설정</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const style = css`
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
        justify-content: center;
        margin-top: 84px;
        .form-box {
            width: 340px;
            .row {
                height: 50px;
                border: 1px solid var(--bluegray_10);
                border-bottom: transparent;
                &:first-child {
                    border-radius: 4px 4px 0 0;
                    overflow: hidden;
                }
                &:last-child {
                    border-bottom: 1px solid var(--bluegray_10);
                    border-radius: 0 0 4px 4px;
                }
                input {
                    width: 100%;
                    height: 100%;
                    border: 0;
                    font-size: 15px;
                    font-weight: bold;
                    padding: 14px 18px;
                    &::placeholder {
                        font-weight: normal;
                        color: var(--bluegray_30);
                    }
                }
                .checkbox {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    &:hover {
                        span {
                            color: var(--dodgeblue_50);
                        }
                    }
                    .box {
                        position: relative;
                        width: 17px;
                        height: 17px;
                        margin-right: 5px;
                        background-color: white;
                        box-shadow: inset 0 2px 5px -5px black;
                        border: 1px solid var(--gray_20);
                        border-radius: 3px;
                        &.sel {
                            &::after {
                                content: '✔';
                                width: 17px;
                                height: 17px;
                                position: absolute;
                                font-size: 14px;
                                font-weight: 600;
                                color: var(--dodgeblue_50);
                                transform: translate(2px, -2px);
                            }
                        }
                    }
                    span {
                        font-size: 12px;
                        color: var(--bluegray_30);
                    }
                }
                .find {
                    display: flex;
                    align-items: center;
                    .txt {
                        font-size: 12px;
                        color: var(--bluegray_30);
                        cursor: pointer;
                        padding-left: 5px;
                        &:first-child {
                            padding-right: 5px;
                            border-right: 1px solid var(--gray_10);
                        }
                        &:hover {
                            color: var(--dodgeblue_50);
                        }
                    }
                }
                &:last-child {
                    display: flex;
                    justify-content: space-between;
                    align-ietms: center;
                    padding: 14px 18px;
                    background-color: #f7fcff;
                }
            }
        }
    }
`;

export default LoginPage;
