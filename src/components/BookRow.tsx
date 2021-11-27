import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Checkbox} from './index';
import { BookData } from '../utils/interfaces';

interface Props {
    book: BookData
    checkValue?: boolean 
    onClickToDetail: (param: BookData)=> void
    onClickDelete: (param: BookData)=> void
    onBookCheckChanged: (param: BookData, param2: boolean)=> void
}

function BookRow({book, checkValue=false, onClickToDetail, onClickDelete, onBookCheckChanged}: Props) {
    const [check, setCheck] = useState(false);
    const discountPrice = (org: number, dis: number)=>{
        return (Math.floor(org - (org * (dis / 100)))).toLocaleString();
    }

    const onCheckChanged = (value: boolean)=>{
        onBookCheckChanged(book, value);
    }
    
    useEffect(()=>{
        setCheck(checkValue);
    }, [checkValue]);

    return (
        <div css={style}>
            <div className='book-info' data-id={book.id} data-check={check}>
                <Checkbox label='' onCheckChanged={onCheckChanged} value={check}/>
                <img src={book.thumbnail} onClick={()=> onClickToDetail(book)}></img>
                <div className='info'>
                    <div className='tit' onClick={()=> onClickToDetail(book)}>{book.title}</div>
                    <div className='auth'>{book.author.name}</div>
                    <div className='btn-box'>
                        <div className='sub-button-white'>위시리스트로 이동</div>
                        <div className='sub-button-white' onClick={()=> onClickDelete(book)}>삭제</div>
                    </div>
                </div>
            </div>
            <div className='price-info'>
                {book.buySalePercent ? 
                    <div className='org-price'>
                        {book.buyPrice.toLocaleString()}원
                    </div>
                : null}
                <div className='last-price'>
                    <span>{book.buySalePercent}% ↓</span>
                    <div className='last'>
                        {discountPrice(book.buyPrice, book.buySalePercent)}원
                    </div>
                </div>
            </div>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: space-between;
    .book-info {
        display: flex;
        img {
            cursor: pointer;
            width: 60px;
            height: 87px;
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 15px;
            .tit {
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                color: black;
            }
            .auth {
                font-size: 12px;
                color: var(--gray_60);
                margin-bottom: 10px;
            }
            .btn-box {
                display: flex;
                .sub-button-white {
                    height: 30px;
                    margin-right: 5px;
                }
            }
        }
    }
    .price-info {
        margin-top: 10px;
        > * {
            text-align: right;
        }
        .org-price {
            color: var(--slategray_20);
            font-size: 12px;
            text-decoration: line-through;
        }
        .last-price {
            display: flex;
            align-items: center;
            span {
                color: var(--red_40);
            }
            .last {
                color: var(--dodgeblue_50);
                font-size: 14px;
                font-weight: bold;
                margin-left: 6px;
            }
        }
    }
`;

export default BookRow;
