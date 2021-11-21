import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';
import {BookCard, SliderMoveButton} from './index';
import {FaStar, FaStarHalfAlt} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

interface Props {
    bookList: BookData[]
    hideRate?: boolean
    hideTotal?: boolean
    hidePrice?: boolean
    width?: number
    height?: number
    badge?: 'waitFree' | 'discount' | 'rent';
}

function BookGridSlider({bookList, width=110, height}: Props) {
    const navigate = useNavigate();
    const divRef = useRef<HTMLDivElement | null>(null);
    const [bookWidth, setBookWidth] = useState(width);
    const [move, setMove] = useState(0);

    const getBoxWidth = ()=> Math.floor(divRef.current!.getBoundingClientRect().width);

    const onSlideBtnClick = (dir: string)=>{

    }

    const getStars = (book: BookData)=>{
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

    const onBookClick = (book: BookData)=>{
        navigate('/books', {
            state: {
                book: book
            }
        });
    }
    const onTitleClick = (e: React.MouseEvent<HTMLDivElement | null>)=>{
        const book = bookList.filter(b => b.id === Number(e.currentTarget.dataset.book))[0];
        navigate('/books', {
            state: {
                book: book
            }
        });
    }
    
    const onAuthorClick = (e: React.MouseEvent<HTMLDivElement | null>)=>{
        const book = bookList.filter(b => b.id === Number(e.currentTarget.dataset.book))[0];
        navigate('/author', {
            state: {
                author: book.author
            }
        });
    }

    return (
        <div css={style(width)} ref={divRef}>
            <div className='wrapper'>
                    {bookList.map((book, i) => (
                        <div className='book-box'>
                            <div className='card'>
                                <BookCard 
                                    key={book.id}
                                    book={book}
                                    hideDetailInfo={true}
                                    width={bookWidth}
                                    height={height}
                                    badge='none'
                                    move={move}
                                    onBookClick={onBookClick}/>
                            </div>
                            <div className='detail-box'>
                                <div className='seq v-center'>{i+1}</div>
                                <div className='info v-center'>
                                    <div className='title' data-book={book.id} onClick={onTitleClick}>{book.title}</div>
                                    <div className='author' data-book={book.id} onClick={onAuthorClick}>{book.author.name}</div>
                                    {width > 70 ? 
                                        <div className='rate'>
                                            {getStars(book)}
                                            <span>{book.starRate.rateBuyerNum}</span>
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className='btn-slide-box'>
                <SliderMoveButton direction='left' onMoveButtonClick={onSlideBtnClick}/>
                <SliderMoveButton direction='right' onMoveButtonClick={onSlideBtnClick}/>
            </div>
        </div>
    );
}

const style = (width: number)=> (css`
    width: 1000px;
    position: relative;
    display: flex;
    justify-content: center;
    > .wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: ${width < 70 ? '270px' : '399px'};
        .book-box {
            width: 33%;
            display: flex;
            padding: 10px 0 0 9px;
            overflow: hidden;
            margin-bottom: 10px;
            .card {
                &:not(:first-child) {
                    margin-left: 22px;
                }
            }
            .v-center {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .detail-box {
                display: flex;
                width: 100%;
                border-bottom: 1px solid var(--gray_10);
                margin: 0 10px 0 15px;
                .seq {
                    font-size: 18px;
                    font-weight: bold;
                    margin: 0 21px 0 10px;
                }
                .info {
                    font-size: 14px;
                    .title {
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .author {
                        color: var(--gray_60);
                        margin: 8px 0;
                        cursor: pointer;
                    }
                    .rate {
                        display: flex;
                        align-items: center;
                        span {
                            font-size: 11px;
                            color: var(--gray_40);
                            margin-left: 3px; 
                        }
                    }
                }
            }
        }
    }
    .btn-slide-box {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: space-between;
        // width: calc(100vw - 70px);
        width: 100%;
    }
`);

export default BookGridSlider;
