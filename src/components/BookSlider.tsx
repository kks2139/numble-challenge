import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';
import {BookCard, SliderMoveButton} from './index';

interface Props {
    bookList: BookData[]
    gridType?: boolean 
    hideRate?: boolean
    hideTotal?: boolean
    hidePrice?: boolean
    width?: number
    badge?: 'waitFree' | 'discount' | 'rent';
}

function BookSlider({bookList, gridType=false, hideRate=true, hideTotal=true, hidePrice=true, width=110, badge}: Props) {
    const SHOW_CNT = 6;
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
                                move={move}/>
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

const style = css`
    max-width: 1000px;
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
        top: 70px;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
`;

export default BookSlider;
