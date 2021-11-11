import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Link} from 'react-router-dom';
import {SearchBar} from './index';
import {FaCoins, FaRegBell} from 'react-icons/fa';
import {AiFillHome} from 'react-icons/ai';
import {BsCart} from 'react-icons/bs';
import {IoPersonOutline} from 'react-icons/io5';

function Header() {
    const onSearchBook = (searchText: string)=>{
        
    }

    return (
        <div css={style}>
            <div className='wrapper'>
                <div className='top-box'>
                    <div className='main-box'>
                        <div className='title-box'>
                            <Link to='/' className='title-1'>RIDIBOOKS</Link>
                            <div className='wall'></div>
                            <div className='title-2'>RIDI<span>Select</span></div>
                        </div>
                        <SearchBar onSearch={onSearchBook}/>
                    </div>
                    <div className='menu-box'>
                        <div className='btn'>
                            캐시충전<FaCoins size='11'/>
                        </div>
                        <div className='btn'>
                            내 서재
                        </div>
                    </div>
                </div>
                <div className='link-box'>
                    <Link to='/'>
                        <div className='img-btn'>
                            <AiFillHome size='20'/>
                            <div className='txt'>홈</div>
                            <div className='underline'></div>
                        </div>
                    </Link>
                    <Link to='/notification'>
                        <div className='img-btn'>
                            <FaRegBell size='20'/>
                            <div className='txt'>알림</div>
                            <div className='underline'></div>
                        </div>
                    </Link>
                    <Link to='/cart'>
                        <div className='img-btn'>
                            <BsCart size='20'/>
                            <div className='txt'>카트</div>
                            <div className='underline'></div>
                        </div>
                    </Link>
                    <Link to='/myridi'>
                        <div className='img-btn'>
                            <IoPersonOutline size='20'/>
                            <div className='txt'>마이리디</div>
                            <div className='underline'></div>
                        </div>
                    </Link>
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
        min-width: 1000px;
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
                    border: 1px solid white;
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
                }
            }
        }
        .link-box {
            display: flex;
            height: 35px;
            .img-btn {
                position: relative;
                display: flex;
                height: 100%;
                margin-right: 50px;
                font-weight: bold;
                font-size: 16px;
                cursor: pointer;
                svg {
                    margin-right: 15px;
                }
                .txt {
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
                    .txt {
                        color: var(--dodgeblue_20);
                    }
                }
            }
        }
    }
`;

export default Header;
