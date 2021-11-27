import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Tab} from '../index';
import {AiFillCheckCircle} from 'react-icons/ai';
import {BsCart2} from 'react-icons/bs';
import { BookData } from '../../utils/interfaces';
import { useNavigate } from 'react-router-dom';
import {BookCheckedListContainer} from '../../containers/index';

interface Props {
    bookList: BookData[]
    checkedList: BookData[]
    onBookDelete: (param: BookData)=> void
}

function CartPage({bookList, onBookDelete, checkedList}: Props) {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const contRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [priceInfo, setPriceInfo] = useState({
        totalPrice: 0,
        discountPrice: 0,
        lastPrice: 0
    });
    const canBuyNum = bookList.length;
    const canRentNum = bookList.filter(book => book.canRent).length;

    const calculatePrice = ()=>{
        let totalPrice = checkedList.reduce((acc, now)=> now.buyPrice + acc, 0); 
        let discountPrice = Math.floor(checkedList.reduce((acc, now)=> {
            return acc + now.buyPrice * (now.buySalePercent / 100);
        }, 0)); 
        let lastPrice = totalPrice - discountPrice;
        setPriceInfo({
            totalPrice,
            discountPrice,
            lastPrice
        });
    }

    const calcBoxPosition = (e: Event)=>{
        const scrollTop = document.documentElement.scrollTop;
        const box = boxRef.current;
        const contTop = contRef.current?.offsetTop!;
        if(box){
            if(contTop < scrollTop + 10){
                wrapperRef.current?.classList.add('scroll');
            }else {
                wrapperRef.current?.classList.remove('scroll');
            }
        }
    }

    useEffect(()=>{
        window.onscroll = calcBoxPosition;
        return ()=> {
            window.onscroll = null;
        };
    }, []);

    useEffect(()=>{
        calculatePrice();
    }, [checkedList]);

    return (
        <div css={style}>
            <div className='wrapper'>
                <div className='title'>카트</div>
                <div className='content' ref={contRef}>
                    <div className='tab-box'>
                        <Tab names={[`구매 가능 ${canBuyNum}`,`대여 가능 ${canRentNum}`]}>
                            {bookList.length > 0 ? 
                                <>
                                    <div className='buy'>
                                        <BookCheckedListContainer onDelete={onBookDelete} bookList={bookList}/>
                                    </div>
                                    <div className='rent'>
                                        <BookCheckedListContainer onDelete={onBookDelete} bookList={bookList.filter(book => book.canRent)}/>
                                    </div> :

                                </> : 
                                <>
                                    <div className='empty'>
                                        <BsCart2 size='60'/>
                                        카트에 담김 책이 없습니다.
                                    </div>
                                    <div className='empty'>
                                        <BsCart2 size='60'/>
                                        카트에 담김 책이 없습니다.
                                    </div>
                                </>    
                            }
                        </Tab>
                    </div>
                    {bookList.length > 0 ?
                        <div className='purchase-box'>
                            <div className='wrapper' ref={wrapperRef}>
                                <div className='selected-box' ref={boxRef}>
                                    <div className='row'>
                                        <span className='top'><AiFillCheckCircle size='18'/>{checkedList.length}권을 선택하셨습니다.</span>
                                    </div>
                                    <div className='row'>
                                        <span>총 상품 금액</span>
                                        <span className='price'>{priceInfo.totalPrice.toLocaleString()}원</span>
                                    </div>
                                    <div className='row'>
                                        <span>할인 금액</span>
                                        <span className='price'>
                                            {priceInfo.discountPrice > 0 ? '-' : ''} {priceInfo.discountPrice.toLocaleString()}원
                                        </span>
                                    </div>
                                    <div className='row total'>
                                        <span>합계</span>
                                        <span className='price'>{priceInfo.lastPrice.toLocaleString()}원</span>
                                    </div>
                                </div>
                                <div className='main-button-blue'> 선택 구매하기</div>
                            </div>
                        </div>
                    : null}
                </div>
            </div>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
    > .wrapper {
        width: 950px;
        min-height: 620px;
        margin-top: 30px;
        > .title {
            font-size: 24px;
            font-weight: bold;
            color: var(--slategray_90);
            margin: 0 0 15px 0;
        }
        > .content {
            position: relative;
            display: flex;
            // justify-content: space-between;
            .tab-box {
                .empty {
                    width: 100%;
                    height: 434px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: var(--slategray_60);
                    font-size: 13px;
                    svg {
                        margin-bottom: 25px;
                        color: var(--slategray_10);
                    }
                }
            }
            .purchase-box {
                position: relative;
                margin-left: 45px;
                .wrapper {
                    top: 10px;
                    &.scroll {
                        position: fixed;
                    }
                    .selected-box {
                        width: 288px;
                        border: 1px solid var(--dodgeblue_50);
                        .row {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 15px 20px 0 20px; 
                            &.total {
                                background-color: var(--dodgeblue_5);
                                padding: 11px 20px;
                                margin-top: 20px;
                                .price {
                                    font-size: 20px;
                                    color: var(--dodgeblue_50);
                                }
                            }
                            span {
                                font-weight: bold;
                                font-size: 13px;
                                color: var(--bluegray_30);
                                display: flex;
                                align-items: center;
                                &.top {
                                    font-size: 12px;
                                    color: var(--dodgeblue_50);
                                    svg {
                                        color: var(--dodgeblue_40);
                                        margin-right: 3px;
                                    }
                                }
                                &.price {
                                    color: var(--slategray_90);
                                }
                            }
                        }
                    }
                    .main-button-blue {
                        font-size: 16px;
                        height: 53px;
                        padding 16px;
                        margin-top: 10px;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                    }
                }
            }
        }
    }
`;

export default CartPage;
