import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Link, useNavigate} from 'react-router-dom';
import {SearchBar} from './index';
import {FaCoins, FaRegBell} from 'react-icons/fa';
import {AiFillHome} from 'react-icons/ai';
import {BsCart} from 'react-icons/bs';
import {IoPersonOutline} from 'react-icons/io5';
import {User} from '../utils/interfaces';
import {checkSession} from '../utils/util';

interface Props {
    currentUser: User | null
    onLink: (param: string)=> void
    currentPath: string
}

function Header({currentUser, onLink, currentPath}: Props) {
    const navigate = useNavigate();
    const divRef = useRef<HTMLDivElement | null>(null);
    const [hasSession, setHasSession] = useState(false);

    const onSearchBook = (searchText: string)=>{
        
    }

    const onClickTitle = (e: React.MouseEvent<HTMLElement>)=>{
        toggleSelected('/');
    }

    const onClickLink = (e: React.MouseEvent<HTMLDivElement>)=>{
        const to = e.currentTarget.dataset.to!;
        toggleSelected(to);
        if(checkSession()){
            navigate(to!);
        }else{
            if(to !== '/'){
                navigate('/login');
            }
        }
        onLink(to);
    }
    
    const toggleSelected = (path: string)=>{
        divRef.current?.querySelectorAll('.link-box .sel').forEach(el => el.classList.remove('sel'));
        divRef.current?.querySelector(`[data-to='${path}'] .link-btn`)?.classList.add('sel');
    }

    useEffect(()=>{
        setHasSession(checkSession());
    }, [currentUser, currentPath]);

    return (
        <div css={style} ref={divRef}>
            <div className='wrapper'>
                <div className='top-box'>
                    <div className='main-box'>
                        <div className='title-box'>
                            <Link to='/' className='title-1' onClick={onClickTitle}>RIDIBOOKS</Link>
                            <div className='wall'></div>
                            <div className='title-2'>RIDI<span>Select</span></div>
                        </div>
                        <SearchBar onSearch={onSearchBook}/>
                    </div>
                    <div className='menu-box'>
                        {hasSession ? 
                            <>
                                <div className='btn'>
                                    캐시충전<FaCoins size='11'/>
                                </div>
                                <Link to='/' className='btn'>
                                    내 서재
                                </Link>
                            </> :
                            <>
                                <Link to='/signup' className='btn'>
                                    회원가입
                                </Link>
                                <Link to='/login' className='btn white'>
                                    로그인
                                </Link>
                            </>
                        }
                    </div>
                </div>
                <div className='link-box'>
                    <div className='link' data-to='/' onClick={onClickLink}>
                        <div className='link-btn sel'>
                            <AiFillHome size='20'/>
                            <div className='txt'>홈</div>
                            <div className='underline'></div>
                        </div>
                    </div>
                    <div className='link' data-to='/notification' onClick={onClickLink}>
                        <div className='link-btn'>
                            <FaRegBell size='20'/>
                            <div className='txt'>알림</div>
                            <div className='underline'></div>
                        </div>
                    </div>
                    <div className='link' data-to='/cart' onClick={onClickLink}>
                        <div className='link-btn'>
                            <BsCart size='20'/>
                            <div className='txt'>카트</div>
                            <div className='underline'></div>
                        </div>
                    </div>
                    <div className='link' data-to='/myridi' onClick={onClickLink}>
                        <div className='link-btn'>
                            <IoPersonOutline size='20'/>
                            <div className='txt'>마이리디</div>
                            <div className='underline'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    height: 113px;
    background-color: var(--dodgeblue_50);
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 1000px;
        height: 100%;
        padding: 16px 14px 0 14px;
        .top-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .main-box {
                display: flex;
                .title-box {
                    display: flex;
                    align-items: center;
                    margin-right: 17px;
                    [class*='title'] {
                        display: flex;
                        align-items: center;
                        font-size: 22px;
                        font-weight: bold;
                        span {
                            font-weight: normal;
                        }
                        cursor: pointer;
                    }
                    .title-1 {
                        &:hover {
                            color: var(--dodgeblue_10);
                        }
                    }
                    .title-2 {
                        color: var(--dodgeblue_20);
                        &:hover {
                            color: var(--dodgeblue_10);
                        }
                    }
                    .wall {
                        width: 1px;
                        height: 14px;
                        background-color: var(--dodgeblue_20);
                        margin: 4px 10px 0 10px;
                    }
                }
            }
            .menu-box {
                display: flex;
                .btn {
                    display: flex;
                    align-items: center;
                    border-radius: 3px;
                    border: 1px solid var(--dodgeblue_10);
                    color: white;
                    font-size: 13px;
                    font-weight: bold;
                    padding: 5px 15px;
                    margin-left: 6px;
                    transition: .3s;
                    cursor: pointer;
                    &:hover {
                        color: var(--dodgeblue_20);
                        border-color: var(--dodgeblue_20);
                    }
                    svg {
                        margin-left: 4px;
                    }
                    &.white {
                        background-color: white;
                        color: var(--dodgeblue_50);
                        border-color: unset;
                        &:hover {
                            background-color: var(--dodgeblue_10);
                        }
                    }
                }
            }
        }
        .link-box {
            display: flex;
            height: 35px;
            .link {
                color: white;
                margin-right: 50px;
                .link-btn {
                    position: relative;
                    display: flex;
                    height: 100%;
                    font-weight: bold;
                    font-size: 16px;
                    cursor: pointer;
                    svg {
                        margin-right: 15px;
                    }
                    .txt, svg {
                        transition: .3s;
                    }
                    .underline {
                        position: absolute;
                        left: -5px;
                        bottom: 0;
                        width: calc(100% + 10px);
                        height: 0px;
                        background-color: var(--dodgeblue_20);
                    }
                    &:hover {
                        .underline {
                            height: 3px;
                        }
                        .txt, svg {
                            color: var(--dodgeblue_20);
                        }
                    }
                    &.sel {
                        .underline {
                            height: 3px;
                        }
                    }
                }
            }
        }
    }
`;

export default Header;
