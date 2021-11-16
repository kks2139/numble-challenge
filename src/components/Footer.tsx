import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';

function Footer() {
    const [clickDetail, setDetail] = useState(false);

    return (
        <div css={style}>
            <div className='top-box'>
                <div className='title-box'>
                    <div className='txt'>고객센터</div>
                    <div className='wall'></div>
                    <div className='txt'>공지사항</div>
                </div>
                <ul className='detail-box'>
                    <li><span className='bold'>RIDI</span>PAPER</li>
                    <li>제휴카드</li>
                    <li>뷰어 다운로드</li>
                    <li>리디캐시 충전</li>
                </ul>
                <ul className='detail-box'>
                    <li>콘텐츠 제공 문의</li>
                    <li>CP 사이트</li>
                    <li>사업 제휴 문의</li>
                    <li>리디셀렉트 B2B</li>
                </ul>
                <ul className='detail-box'>
                    <li>페이스북</li>
                    <li>인스타그램</li>
                </ul>
                <ul className='detail-box'>
                    <li>회사소개</li>
                    <li>인재채용<div className='new'>N</div></li>
                </ul>
            </div>
            <div className='corp-box'>
                <div className={`title ${clickDetail ? 'sel' : ''}`} onClick={()=> {setDetail(pre => !pre)}}>
                    리디(주) 사업자 정보
                    <MdOutlineKeyboardArrowDown size='14'/>
                </div>
                <div className={`details ${clickDetail ? 'sel' : ''}`}>
                    <div className='txt'>
                        대표자 배기식<div className='wall'></div>
                        사업자 등록번호 120-87-27435<div className='wall'></div>
                        통신판매업 신고번호 제 2009-서울강남 35-02139호
                    </div>
                    <div className='txt'>
                        이메일 help@ridi.com<div className='wall'></div>
                        대표전화 1644-0331<div className='wall'></div>
                        주소 서울시 강남구 역삼동 702-28 어반벤치빌딩 10층(테헤란로 325)
                    </div>
                </div>
            </div>
            <div className='policy-box'>
                © RIDI Corp.<div className='space'></div>
                <div className='list'>
                    <span>이용 약관</span><div className='wall'></div>
                    <span className='bold'>개인 정보 처리 방침</span><div className='wall'></div>
                    <span>청소년 보호 정책</span><div className='wall'></div>
                    <span>사업자 정보 확인</span>
                </div>
            </div>
        </div>
    );
}

const style = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--slategray_90);
    color: white;
    .top-box {
        display: flex;
        width: 1000px;
        max-height: 700px;
        padding: 24px 16px;
        .title-box {
            display: flex;
            
            .txt {
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
                &:hover {
                    color: var(--slategray_30);
                }
            }
            .wall {
                width: 1px;
                height: 14px;
                background-color: var(--bluegray_40);
                margin: 7px 10px 0 10px;
            }
        }
        .detail-box {
            margin: 5px 0 0 0;
            li {
                display: flex;
                width: 140px;
                font-size: 14px;
                margin-bottom: 16px;
                cursor: pointer;
                .bold {
                    font-weight: bold;
                }
                .new {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 15px;
                    height: 15px;
                    border-radius: 1px;
                    font-weight: bold;
                    font-size: 12px;
                    color: var(--slategray_90);
                    margin: 2px 0 0 5px;
                    background-color: var(--dodgeblue_40);
                }
                &:hover {
                    color: var(--slategray_30);
                    .new {
                        filter: brightness(.8);
                    }
                }
            }
        }
    }
    .corp-box {
        width: 1000px;
        font-size: 12px;
        color: var(--slategray_50);
        padding: 0 16px;
        .title {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            font-weight: bold;
            cursor: pointer;
            transition: .3s;
            svg {
                margin-left: 4px;
            }
            &.sel {
                svg {
                    transform: rotate(180deg);
                }
            }
            &:hover {
                color: var(--slategray_60);
            }
        }
        .details {
            display: none;
            .txt {
                display: flex;
                line-height: 20px;
                font-size: 10px;
            }
            .wall {
                width: 1px;
                height: 10px;
                background-color: var(--bluegray_50);
                margin: 5px 10px 0 10px;
            }
            &.sel {
                display: block;
            }
        }
    }
    .policy-box {
        display: flex;
        align-items: center;
        width: 1000px;
        padding: 0 16px;
        margin: 12px 0 30px 0;
        font-size: 14px;
        color: var(--slategray_50);
        span:hover {
            color: var(--slategray_60);
        }
        .space {
            width: 40px;
        }
        .wall {
            width: 1px;
            height: 10px;
            background-color: var(--bluegray_50);
            margin: 5px 10px 0 10px;
        }
        .list {
            display: flex;
            font-size: 11px;
            span {
                cursor: pointer;
                &:hover {
                    color: var(--slategray_60);
                }
                &.bold {
                    font-weight: bold;
                }
            }
        }
    }
`;

export default Footer;
