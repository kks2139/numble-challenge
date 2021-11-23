import React, { useEffect, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';
import {FaStar, FaStarHalfAlt} from 'react-icons/fa';
import {HiClock} from 'react-icons/hi';
import {useNavigate} from 'react-router-dom';

interface Props {
    book: BookData
    hideRate?: boolean
    hideTotal?: boolean
    hidePrice?: boolean
    width?: number
    height?: number
    badge?: 'waitFree' | 'discount' | 'rent' | 'none';
    move?: number
    dark?: boolean
    hideDetailInfo?: boolean
    onBookClick: (param: BookData)=> void
    onAuthorClick?: (param: BookData)=> void
}

function BookCard({
    book, 
    hideRate=false, 
    hideTotal=false, 
    hidePrice=false, 
    width=110, 
    height, 
    badge, 
    move=0, 
    dark=false, 
    hideDetailInfo=false,
    onBookClick: onBookClick,
    onAuthorClick: onAuthorClick
}: Props) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const BadgeShow = badge ? badge : badge === 'none' ? false : ['waitFree', 'discount', 'rent'][Math.floor(Math.random() * 10 % 3)];

    const getStars = ()=>{
        let num = book.starRate.rate;
        return (
            <>
                {Array(5).fill(1).map((a, i)=>{
                    let result = <FaStar size='12' color='#cccccc'/>;
                    if(num - (i+1) >= 0){
                        result = <FaStar size='12' color='#FA722E'/>;
                    }else{
                        if((num + '').indexOf('.') > -1){
                            result = <FaStarHalfAlt size='12' color='#FA722E'/>
                            num = Number(num.toFixed());
                        }
                    }
                    return result;
                })}
            </>
        );
    }

    useEffect(()=>{
        divRef.current!.style.transform = `translateX(${move}px)`;
    }, [move]);

    return (
        <div css={style(book.xRated, width, height, dark)} ref={divRef}>
            <div className='img-box' onClick={()=> {onBookClick(book)}}>
                {book.xRated ? 
                    <div className='cover-xrate'>
                        <div>19</div>
                        <span>19세 미만 이용 불가</span>
                    </div> : 
                    <img src={book.thumbnail}></img>
                }
                {book.waitFree && BadgeShow === 'waitFree' ?
                     <div className='badge-wait-free'><HiClock size={35} color='#1f8ce6'/></div>
                : null}
                {book.buySalePercent >= 10 && BadgeShow === 'discount' ? 
                    <div className='badge-discount'>{book.buySalePercent}%</div> 
                : null}
                {book.canRent && BadgeShow === 'rent' ? 
                    <div className='badge-rent'>대여</div> 
                : null}
                {book.xRated ? 
                    <div className='x-rate'></div> 
                : null}
                {width > 70 && book.freeCount > 0 ?
                    <div className='free-count'>{book.freeCount}권 무료</div> 
                : null}
                <div className='cover-shadow'></div>
                <div className='dark'></div>
            </div>
            {hideDetailInfo ? null : 
                <div className='detail-box'>
                    <div className='title' onClick={()=> {onBookClick(book)}}>
                        {book.title}
                    </div>
                    <div className='author' onClick={()=> {onAuthorClick && onAuthorClick(book)}}>
                        {book.author.name}
                    </div>
                    {hideRate ? null : 
                        <div className='rate'>
                            {getStars()}
                            <span>{book.starRate.rateBuyerNum}명</span>
                        </div>
                    }
                    {hideTotal ? null : 
                        <div className='total'>
                            총 {book.count}
                            {book.isFinished ? <div className='finished'></div> : null}
                        </div>
                    }
                    {hidePrice ? null : 
                        <>
                            <div className='rent'>
                                대여<span>{book.rentalPrice.toLocaleString()}원</span>
                            </div>
                            <div className='price'>
                                구매<span>{book.buyPrice.toLocaleString()}원</span>
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    );
}

const style = (xRated: boolean, width: number, height: number | undefined, dark: boolean)=> (css`
    position: relative;
    width: ${width}px;
    transition: transform .4s;
    .img-box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${width}px;
        height: ${height ? height : 197}px;
        background-color: var(--gray_5);
        cursor: pointer;
        &:hover {
            .dark {
                display: block;
            }
        }
        .dark {
            z-index: 1;
            display: none;
            background-color: rgb(0,0,0,0.1);
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
        .cover-shadow {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            box-shadow: inset 6px 0 11px -7px var(--gray_70), inset -6px 0 11px -7px var(--gray_70);
        }
        .cover-xrate {
            white-space: pre;
            color: var(--gray_20);
            transform: ${70 <= width && width < 90 ? 'scale(0.6)' : width < 70 ? 'scale(0.4)' : ''};
            div {
                width: 50px;
                height: 58px;
                font-size: 41px;
                font-weight: bold;
                border-bottom: 1px solid var(--gray_20);
                margin: 0 auto 6px auto;
            }
            span {
                font-size: 13px;
            }
        }
        img {
            width: 100%;
            height: 100%;
        }
        [class*='badge-'] {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-20%, -20%);
        }
        .badge-discount {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: var(--bluegray_40); 
            font-weight: bold;
            font-size: 14px;
            color: white;
        }
        .badge-wait-free {
            svg {
                border-radius: 50%;
                box-shadow: 2px 4px 10px -6px black;
                background-color: white;
            }
        }
        .badge-rent {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: var(--green_50); 
            font-weight: bold;
            font-size: 14px;
            color: white;
        }
        .free-count {
            position: absolute;
            background-color: rgb(0,0,0,0.5); 
            border: 1px solid var(--gray_50);
            border-radius: 2px;
            right: 0;
            bottom: 0;
            font-size: 12px;
            font-weight: bold;
            color: white;
            padding: 3px 5px;
        }
        .x-rate {
            position: absolute;
            top: 2px;
            right: 4px;
            &::after {
                content: '19';
                font-weight: bold;
                font-size: 12px;
                padding: 0 1px;
                background-color: white;
                border-radius: 50%;
                border: 1px solid red;
            }
        }
    }
    .detail-box {
        .title {
            font-size: 13px;
            font-weight: bold;
            color: ${dark ? 'white' : 'var(--gray_80)'};
            margin: 5px 0;
            cursor: pointer;
        }
        .author {
            font-size: 12px;
            color: ${dark ? 'var(--gray_30)' : 'var(--gray_60)'};
            // font-weight : ${dark ? 'bold' : 'normal'};
            margin-bottom: 5px;
            cursor: pointer;
        }
        .rate {
            display: flex;
            align-items: center;
            font-size: 12px;
            margin-bottom: 5px;
            span {
                font-size: 11px;
                color: var(--gray_40);
                margin-left: 3px;
            }
        }
        .total {
            font-size: 12px;
            color: var(--gray_60);
            margin-bottom: 5px;
            .finished {
                background-color: var(--gray_60);
                border-radius: 3px;
                color: white;
            }
        }
        .rent, .price {
            display: flex;
            font-size: 12px;
            color: var(--gray_60);
            margin-bottom: 5px;
            span {
                font-weight: bold;
                color: var(--dodgeblue_50);
                margin-left: 3px;
            }
        }
        
    }
`);

export default BookCard;
