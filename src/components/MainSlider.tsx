import React, {useEffect, useRef, useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';

interface Props {
    bookList: BookData[]
}

function MainSlider({bookList}: Props) {
    const highRateBooks = bookList.filter(book => book.starRate.rate > 4.0);
    const divRef = useRef<HTMLDivElement | null>(null);

    const markCenterBox = ()=>{
        const boxes = divRef.current?.querySelectorAll('[data-move-box]');
        let halfIndex = boxes ? Math.ceil(boxes.length / 2) : 0;

    }

    const moveTo = (dir: 'left' | 'right')=>{
        const boxes = divRef.current?.querySelectorAll('[data-move-box]');

        boxes?.forEach(box => {
            if(box instanceof HTMLDivElement){
                const {width} = box.getBoundingClientRect();
                const sideMargin = 5;
                let nowLeft = Number(box.style.left.split('px').join(''));
                box.style.left = (dir === 'left' ? 
                    nowLeft - width - sideMargin : 
                    nowLeft + width + sideMargin) + 'px';
            }
        });

        if(dir === 'left'){

        }else{

        }
    }
    
    const clickTest = (e: React.MouseEvent<HTMLButtonElement>)=>{
        if(e.currentTarget.dataset.left){
            moveTo('left');
        }else{
            moveTo('right');
        }
    }

    useEffect(()=>{

    });

    return (
        <div css={style} ref={divRef}>
            <div className='wrapper'>
                {highRateBooks.map(b => (
                    <div className='box' data-move-box>
                        <img src={b.thumbnail}></img>
                    </div>
                ))}
            </div>
            <button data-left onClick={clickTest}>L</button>
            <button data-right onClick={clickTest}>R</button>
        </div>
    );
}

const style = css`
    // position: relative;
    .wrapper {
        // position: absolute;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        width: 100%;
        overflow: hidden;
        .box {
            position: relative;
            left: 0px;
            min-width: 414px;
            height: 286px;
            overflow: hidden;
            border-radius: 7px;
            margin: 0 5px;
            transition: .2s;
            img {
                width: 100%;
                height: 100%;
            }
            &.center {
                transform: scale(1.05);
            }
        }
    }

    @keyframe slide {
        
    }
`;

export default MainSlider;
