import React, { useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Link, useNavigate} from 'react-router-dom';
import { request } from '../../utils/util';
import { User } from '../../utils/interfaces';

interface Props {
    onLogin: (param: User)=> void
}

function LoginPage({onLogin}: Props) {
    const navigate = useNavigate();
    const divRef = useRef<HTMLDivElement | null>(null);
    const [warn, setWran] = useState('');
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

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.code === 'Enter'){
            doLogin();
        }
    }

    const setSession = (user: User)=>{
        user.pw = '';
        onLogin(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        navigate('/');
    }

    const onClickSignup = ()=>{
        navigate('/signup');
    }
    
    const doLogin = async ()=>{
        if(validate()){
            const user: User = await request('login');
            if(user) {
                if(inputs.id === user.id && inputs.pw === user.pw){
                    setSession(user);
                }else{
                    setWran('아이디 또는 비밀번호를 확인해주세요.');
                }
            }
        }
    }

    const validate = ()=>{
        let msg = '';
        let result = true;
        let name = '';
        if(!inputs.id.trim()){
            msg = '아이디를 입력해주세요.';
            name = 'id';
            result = false;
        }else if(!inputs.pw.trim()){
            msg = '비밀번호를 입력해주세요.';
            name = 'pw';
            result = false;
        }
        setWran(msg);

        if(!result){
            const input = divRef.current?.querySelector(`input[name=${name}]`);
            if(input instanceof HTMLInputElement){
                input.focus();
            }
        }
        return result;
    }

    const onCheckboxClick = (e: React.MouseEvent<HTMLDivElement>)=>{
        const box = e.currentTarget.querySelector('.box');
        box?.classList.toggle('sel');
    }

    return (
        <div css={style} ref={divRef}>
            <div className='header'>
                <Link to='/'>RIDIBOOKS</Link>
            </div>
            <div className='content'>
                <div className='form-box'>
                    <div className='row'>
                        <input name='id' autoComplete='off' placeholder='아이디' value={inputs.id} onKeyDown={onKeyDown} onChange={onChange}></input>
                    </div>
                    <div className='row'>
                        <input name='pw' autoComplete='off' placeholder='비밀번호' type='password' value={inputs.pw} onKeyDown={onKeyDown} onChange={onChange}></input>
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
                {warn ? 
                    <div className='warn'>
                        <span>{warn}</span>
                    </div>
                : null}
                <div className='button-box'>
                    <div className='main-button-blue nohover' onClick={doLogin}>로그인</div>
                    <div className='sub-button-white nohover' onClick={onClickSignup}>회원가입</div>
                </div>
            </div>
        </div>
    );
}

const style = css`
    --width: 340px;
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
        margin-top: 84px;
        .form-box {
            width: var(--width);
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
                &:hover {
                    &:not(:last-child) {
                        border-color: var(--gray_40);
                        & + .row {
                            border-top-color: var(--gray_40);
                        }
                    }
                }
                &:focus-within {
                    &:not(:last-child) {
                        border-color: var(--dodgeblue_50);
                        & + .row {
                            border-top-color: var(--dodgeblue_50);
                        }
                    }
                }
                input {
                    width: 100%;
                    height: 100%;
                    border: 0;
                    font-size: 15px;
                    font-weight: bold;
                    padding: 14px 18px;
                    &:hover, &:focus {
                        box-shadow: inset 0 1px 5px -4px black;
                    }
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
                        font-size: 11.5px;
                        color: var(--bluegray_30);
                    }
                }
                .find {
                    display: flex;
                    align-items: center;
                    .txt {
                        font-size: 11.5px;
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
        .warn {
            width: var(--width);
            display: flex;
            justify-content: flex-start;
            margin-top: 10px;
            span {
                color: red;
                font-size: 12px;
                font-weight: bold;
                &::before {
                    content: '!';
                    margin: 0 5px;
                }
            }
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

export default LoginPage;
