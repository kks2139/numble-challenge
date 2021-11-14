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

    const getBoxes = ()=> divRef!.current!.querySelectorAll('[data-move-box]');

    const setBoxVisible = (centerNode: HTMLElement)=> {
        const boxes = getBoxes();
        boxes?.forEach(box => box.classList.remove('show'));
        boxes?.forEach((box, i, arr) => {
            if(box instanceof HTMLDivElement){
                if(box === centerNode){
                    arr[i-1]?.classList.add('show');
                    box.classList.add('show');
                    arr[i+1]?.classList.add('show');
                }
            }
        });
    }

    const markCenterBox = (node: HTMLElement, dir?: string)=>{
        const {x, width} = node.getBoundingClientRect();
        const center = window.innerWidth / 2;
        const nextCenter = dir === 'left' ? center + width : dir === 'right' ? center - width : center; 

        if(x <= nextCenter && nextCenter <= (x + width)){
            node.classList.add('center');
            setBoxVisible(node);
        }
    }
    
    const moveTo = (dir: 'left' | 'right')=>{
        const boxes = getBoxes();
        boxes?.forEach((box, i, arr) => {
            if(box instanceof HTMLDivElement){
                box.classList.remove('center');
                const targBox = dir === 'left' ? box : arr[i-1];
                if(targBox instanceof HTMLDivElement){
                    markCenterBox(targBox, dir);
                }
                
                const {width} = box.getBoundingClientRect();
                let currPos = Number(box.style.left.split('px').join(''));
                box.style.left = (dir === 'left' ? currPos - width : currPos + width) + 'px';
            }
        });
    }
    
    const clickTest = (e: React.MouseEvent<HTMLButtonElement>)=>{
        const dir = e.currentTarget.dataset.left;
        moveTo(dir ? 'left' : 'right');
    }

    useEffect(()=>{
        const boxes = getBoxes();
        boxes?.forEach(box => {
            if(box instanceof HTMLDivElement){
                markCenterBox(box);
            }
        });
    });

    return (
        <div css={style} ref={divRef}>
            <div className='wrapper'>
                {highRateBooks.map(b => (
                    <div key={b.id} className='box' style={{left: '0'}} data-move-box>
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
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        width: 100%;
        height: 296px;
        overflow-x: hidden;
        .box {
            position: relative;
            min-width: 414px;
            height: 286px;
            padding: 0 5px;
            transition: .2s;
            filter: brightness(0.5);
            opacity: 0;
            img {
                border-radius: 7px;
                width: 100%;
                height: 100%;
            }
            &.center {
                height: 296px;
                filter: unset;
            }
            &.show {
                opacity: 1;
            }
        }
    }

    @keyframe slide {
        
    }
`;

export default MainSlider;
