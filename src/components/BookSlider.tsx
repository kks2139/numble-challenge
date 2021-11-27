import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';
import {BookCard, SliderMoveButton} from './index';
import {useNavigate} from 'react-router-dom';

interface Props {
    bookList: BookData[]
    showCount?: number
    hideRate?: boolean
    hideTotal?: boolean
    hidePrice?: boolean
    width?: number
    dark?: boolean
    badge?: 'waitFree' | 'discount' | 'rent';
}

function BookSlider({
    bookList, 
    showCount=6, 
    hideRate=false, 
    hideTotal=false, 
    hidePrice=false, 
    width=110, 
    dark=false, 
    badge,
}: Props) {
    const navigate = useNavigate();
    const SHOW_CNT = showCount;
    const divRef = useRef<HTMLDivElement | null>(null);
    const [bookWidth, setBookWidth] = useState(width);
    const [move, setMove] = useState(0);

    const getBoxWidth = ()=> Math.floor(divRef.current!.getBoundingClientRect().width);

    const onSlideBtnClick = (dir: string)=>{
        const width = getBoxWidth();

        if(dir === 'left'){
            setMove(pre => {
                let next = 0 <= pre && pre <= 1 ? 
                    -1 * getMaxMove() :
                    pre + width; 
                return next;
            });
        }else{
            setMove(pre => {
                let next = -1 * getMaxMove() >= pre ? 
                    0 : pre - width; 
                return next;
            });
        }
    }

    const getMaxMove = ()=>{
        const width = getBoxWidth()
        return width * Math.floor((bookList.length * bookWidth) / width);
    }

    const getBookWidth = ()=>{
        const width = getBoxWidth()
        return Math.floor(width / (SHOW_CNT + 1)) + 3;
    }

    const onBookClick = (book: BookData)=>{
        navigate('/bookdetail', {
            state: {
                book: book
            }
        });
    }

    const onAuthorClick = (book: BookData)=>{
        navigate('/author', {
            state: {
                author: book.author
            }
        });
    }

    useEffect(()=>{
        setBookWidth(getBookWidth());
    }, []);

    return (
        <div css={style} ref={divRef}>
            <div className='wrapper'>
                {bookList.map(book => (
                    <div className='card'>
                        <BookCard 
                            key={book.id}
                            book={book}
                            hideRate={hideRate}
                            hideTotal={hideTotal}
                            hidePrice={hidePrice}
                            width={bookWidth}
                            badge={badge}
                            dark={dark}
                            move={move}
                            onBookClick={onBookClick}
                            onAuthorClick={onAuthorClick}/>
                    </div>
                ))}
            </div>
            <div className='btn-slide-box'>
                <SliderMoveButton direction='left' type={dark ? 'dark' : ''} onMoveButtonClick={onSlideBtnClick}/>
                <SliderMoveButton direction='right' type={dark ? 'dark' : ''} onMoveButtonClick={onSlideBtnClick}/>
            </div>
        </div>
    );
}

const style = css`
    width: 1000px;
    position: relative;
    display: flex;
    > .wrapper {
        display: flex;
        width: 100%;
        padding: 10px 0 0 9px;
        overflow: hidden;
        .card {
            &:not(:first-child) {
                margin-left: 22px;
            }
        }
    }
    .btn-slide-box {
        position: absolute;
        transform: translateY(200%);
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
`;

export default BookSlider;
