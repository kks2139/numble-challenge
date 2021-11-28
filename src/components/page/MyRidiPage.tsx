import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {checkSession, myMenu} from '../../utils/util';
import { MdOutlineControlPointDuplicate } from 'react-icons/md';
import { RiCoupon3Line } from 'react-icons/ri';
import { BiCoinStack } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { IoIosPerson } from 'react-icons/io';
import { IoCardSharp, IoBookSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface Props {
    onLogout: ()=>void
}

function MyRidiPage({onLogout}: Props) {
    const navigate = useNavigate();
    const session = JSON.parse(sessionStorage.getItem('user') || 'null'); 
    
    const svgMap = (group: string)=>{
        switch(group){
            case 'home': return <AiFillHome size='19'/>;
            case 'book': return <IoBookSharp size='18'/>;
            case 'buy': return <IoCardSharp size='18'/>;
            case 'my': return <IoIosPerson size='18'/>;
        }
    }

    const onClickMenu = ()=>{

    }

    useEffect(()=>{
        if(!checkSession()){
            navigate('/login');
        }
    });

    return (
        <div css={style}>
            <div className='wrapper'>
                <div className='left-menu'>
                    <div className='title'>마이리디</div>
                    <div className='menu-list'>
                        {myMenu.map(menu => (
                            <ul onClick={onClickMenu}>
                                <div className='group'>{svgMap(menu.group)}{menu.title}</div>
                                {menu.children.map(ch => (
                                    <li>{ch}</li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className='main-content'>
                    <div className='my-info'>
                        <div className='account'>
                            <div className='private'>
                                <div className='id'>{session.id}</div>
                                <div className='email'>{session.emailAddr}</div>
                            </div>
                            <div className='logout' onClick={onLogout}>로그아웃</div>
                        </div>    
                        <div className='detail'>
                            <div className='info'>
                                <div className='m-1'>
                                    <BiCoinStack size='30'/>
                                    <div className='text'>리디캐시</div>
                                </div>
                                <div className='m-2'><span>0</span>원</div>
                                <div className='m-3 link'>리디캐시 충전</div>
                            </div>                
                            <div className='info'>
                                <div className='m-1'>
                                    <MdOutlineControlPointDuplicate size='30'/>
                                    <div className='text'>리디포인트</div>
                                </div>
                                <div className='m-2'><span>0</span>원</div>
                                <div className='m-3'>소멸예정 <span>0원</span></div>

                            </div>                
                            <div className='info'>
                                <div className='m-1'>
                                    <RiCoupon3Line size='30'/>
                                    <div className='text'>쿠폰</div>
                                </div>
                                <div className='m-2'><span>0</span>원</div>
                                <div className='m-3 link'>쿠폰등록</div>
                            </div>                
                        </div>            
                    </div>
                    <div className='recent-view'>

                    </div>
                </div>
            </div>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    padding-top: 33px;
    > .wrapper {
        display: flex;
        .left-menu {
            width: 235px;
            margin-bottom: 300px;
            .sel {
                color: var(--dodgeblue_50);
            }
            .title {
                font-size: 24px;
                font-weight: bold;
                color: var(--slategray_100);
            }
            .menu-list {
                font-size: 16px;
                font-weight: bold;
                ul {
                    width: calc(100% - 80px);
                    color: var(--slategray_80);
                    border-bottom: 2px solid var(--gray_5);
                    padding: 17px 0;
                    .group {
                        display: flex;
                        align-items: center;
                        &:first-child {
                            cursor: pointer;
                            margin-top: 10px;
                        }
                        svg {
                            margin-right: 5px;
                            color: var(--slategray_50);
                        }
                    }
                    li {
                        color: var(--slategray_50);
                        cursor: pointer;
                        transition: .2s;
                        margin: 10px 0 0 22px;
                        &:hover {
                            color: var(--slategray_70);
                        }
                    }
                }
            }
        }
        .main-content {
            width: 718px;
            .my-info {
                display: flex;
                border: 2px solid var(--slategray_60);
                height: 182px;
                .account {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 20px;
                    background-color: var(--dodgeblue_5);
                    .private {
                        .id {
                            font-size: 20px;
                            font-weight: bold;
                            color: black;
                        }
                        .email {
                            font-size: 12px;
                            color: var(--slategray_50);
                            margin-top: 6px;
                        }
                    }
                    .logout {
                        width: 68px;
                        display: flex;
                        justify-content: center;
                        padding: 7px 3px;
                        font-size: 13px;
                        font-weight: bold;
                        color: var(--slategray_60);
                        border: 2px solid var(--slategray_20);
                        border-radius: 3px;
                        cursor: pointer;
                        transition: .2s;
                        &:hover {
                            background-color: var(--dodgeblue_10);
                            border-color: var(--slategray_30);
                        }
                    }
                }
                .detail {
                    display: flex;
                    width: 100%;
                    padding: 20px 0;
                    .info {
                        width: 33%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        &:not(:last-child) {
                            border-right: 1px solid var(--slategray_10);
                        }
                        .m-1 {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            cursor: pointer;
                            svg {
                                margin-bottom: 5px;
                            }
                            .text {
                                font-size: 16px;
                                font-weight: bold;
                            }
                        }
                        .m-2 {
                            span {
                                font-size: 28px;
                                color: var(--dodgeblue_50);
                            }
                            cursor: pointer;
                            color: var(--dodgeblue_40);
                            margin-top: 3px;
                        }
                        .m-3 {
                            font-size: 13px;
                            color: var(--slategray_60);
                            margin-top: 16px;
                            transition: .2s;
                            span {
                                font-weight: bold;
                            }
                            &.link {
                                cursor: pointer;
                                &:hover {
                                    color: var(--dodgeblue_50);
                                }
                                &::after {
                                content: '»';
                                margin-left: 5px;
                            }
                        }
                    }
                    .my-point {
    
                    }
                    .my-coupon {
    
                    }
                }
            }
        }
    }
`;

export default MyRidiPage;
