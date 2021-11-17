import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';
import {FaStar, FaStarHalfAlt} from 'react-icons/fa';
import {HiClock} from 'react-icons/hi';

interface Props {
    book: BookData
    hideRate?: boolean
    hideTotal?: boolean
    hidePrice?: boolean
    width?: number
    badge?: 'waitFree' | 'discount';
}

function BookCard({book, hideRate=true, hideTotal=true, hidePrice=true, width=110, badge='waitFree'}: Props) {
    const getStars = ()=>{
        let num = book.starRate.rate;
        return (
            <>
                {Array(5).fill(1).map((a, i)=>{
                    let result = <FaStar size='12' color='#cccccc'/>;
                    if(num - (i+1) >= 0){
                        result = <FaStar size='12' color='orange'/>;
                    }else{
                        if((num + '').indexOf('.') > -1){
                            result = <FaStarHalfAlt size='12' color='orange'/>
                            num = Number(num.toFixed());
                        }
                    }
                    return result;
                })}
            </>
        );
    }

    return (
        <div css={style(book.xRated, width)}>
            <div className='img-box'>
                {book.xRated ? null : <img src={book.thumbnail}></img>}
                {book.waitFree && badge === 'waitFree' ? <div className='wait-free'><HiClock size={35} color='#1f8ce6'/></div>: null}
                {book.buySalePercent >= 10 && badge === 'discount' ? <div className='discount'>{book.buySalePercent}%</div> : null}
                {book.xRated ? <div className='x-rate'></div> : null}
                {book.freeCount > 0 ? <div className='free-count'>{book.freeCount}권 무료</div> : null}
                <div className='cover-shadow'></div>
                <div className='dark'></div>
            </div>
            <div className='detail-box'>
                <div className='title'>{book.title}</div>
                <div className='author'>{book.author.name}</div>
                <div className='rate'>
                    {getStars()}
                    <span>{book.starRate.rateBuyerNum}명</span>
                </div>
                <div className='total'>
                    총 {book.count}
                    {book.isFinished ? <div className='finished'></div> : null}
                </div>
                <div className='rent'>
                    대여<span>{book.rentalPrice.toLocaleString()}원</span>
                </div>
                <div className='price'>
                    구매<span>{book.buyPrice.toLocaleString()}원</span>
                </div>
            </div>
        </div>
    );
}

const style = (xRated: boolean, width: number)=> (css`
    position: relative;
    width: ${width}px;
    cursor: pointer;
    .img-box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${width}px;
        height: ${width === 110 ? '165px' : '190px'};
        background-color: var(--gray_10);
        &:hover {
            .dark {
                display: block;
            }
        }
        .dark {
            z-index: 1;
            display: none;
            background-color: rgb(0,0,0,0.2);
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
            box-shadow: inset 6px 0 11px -7px black, inset -6px 0 11px -7px black;
        }
        ${xRated ? `
            backround-color: var(--gray_20);
            &::after {
                position: absolute;
                content: '19';
                font-size: 40px;
                font-weight: bold;
                white-space: pre;
                color: var(--gray_20);
                border-bottom: 1px solid var(--gray_20);
            }
        ` : ''}
        img {
            width: 100%;
            height: 100%;
        }
        .discount {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-20%, -20%);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--bluegray_40); 
            font-weight: bold;
            font-size: 15px;
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
        .wait-free {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-20%, -20%);
            svg {
                border-radius: 50%;
                box-shadow: 2px 4px 10px -6px black;
                background-color: white;
            }
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
            color: var(--gray_80);
            margin: 5px 0;
        }
        .author {
            font-size: 12px;
            color: var(--gray_60);
            margin-bottom: 5px;
        }
        .rate {
            display: flex;
            align-items: center;
            font-size: 12px;
            margin-bottom: 5px;
            span {
                font-size: 11px;
                color: var(--gray_50);
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
