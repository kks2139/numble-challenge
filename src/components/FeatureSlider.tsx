import React, {useEffect, useRef, useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from 'react-icons/io';

interface Props {
    bookList: BookData[]
}

function MainSlider({bookList}: Props) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const intervalId = useRef(0);
    const endChecked = useRef(false);

    const getBoxes = ()=> divRef!.current!.querySelectorAll('[data-move-box]');

    const circulateList = (dir: string)=>{
        if(dir){
            const wrapper = divRef.current?.querySelector('.wrapper');
            if(dir === 'left'){
                const newNode = wrapper?.firstChild!.cloneNode(true) as HTMLDivElement;
                const lastNode = wrapper?.lastChild as HTMLDivElement;
                const {width} = lastNode.getBoundingClientRect();
                const pos = Number(lastNode.style.left.split('px').join(''));
                
                // newNode.style.left = pos + width + 'px';
                
                wrapper!.removeChild(wrapper?.firstChild!);
                wrapper!.appendChild(newNode);
            }else if(dir === 'right'){
                const newNode = wrapper?.lastChild!.cloneNode(true) as HTMLDivElement;
                const firstNode = wrapper?.firstChild as HTMLDivElement;
                const {width} = firstNode.getBoundingClientRect();
                const pos = Number(firstNode.style.left.split('px').join(''));

                // newNode.style.left = pos + width + 'px';

                wrapper!.removeChild(wrapper?.lastChild!);
                wrapper!.insertBefore(newNode, wrapper?.firstChild!);
            }
        }
        const boxes = getBoxes();
        boxes.forEach(box => {
            if(box instanceof HTMLDivElement){
                const {width} = box.getBoundingClientRect();
                const left = Number(box.style.left.split('px').join(''));
                box.style.left = (dir === 'left' ? left + width : left - width) + 'px';
            }
        });
    }

    const setBoxVisible = (centerNode: HTMLElement)=> {
        const boxes = getBoxes();
        boxes?.forEach(box => box.classList.remove('show'));
        boxes?.forEach((box, i, arr) => {
            if(box instanceof HTMLDivElement){
                if(box === centerNode){
                    if(arr[i-1]){
                        arr[i-1]?.classList.add('show');
                    }else{
                        arr[arr.length-1]?.classList.add('show');
                    }
                    box.classList.add('show');
                    if(arr[+1]){
                        arr[i+1]?.classList.add('show');
                    }else{
                        arr[0]?.classList.add('show');
                    }
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
                markCenterBox(box, dir);
                const {width} = box.getBoundingClientRect();
                const currPos = Number(box.style.left.split('px').join(''));
                box.style.left = (dir === 'left' ? currPos - width : currPos + width) + 'px';
            }
        });

        if(!existSide(dir)){
            // 미완성...
            // circulateList(dir);

            moveToFirstPosition(dir);  
        }
    }

    const moveToFirstPosition = (dir: string)=>{
        const boxes = getBoxes();
        boxes.forEach((box, i, arr) => {
            if(box instanceof HTMLDivElement){
                box.style.left = '0';
                markCenterBox(box);
            }
        });
    }

    const existSide = (dir: string)=>{
        const centerBox = divRef.current!.querySelector('.center');
        const boxes = getBoxes();
        let result = true;
        boxes.forEach((box, i, arr) => {
            if(box instanceof HTMLDivElement){
                if(box === centerBox){
                    if(dir === 'right'){
                        result = arr[i-2] ? true : false;
                    }else{
                        result = arr[i+2] ? true : false;
                    }
                }
            }
        });
        return result;
    }

    const initBoxPositoin = ()=>{
        const boxes = getBoxes();
        boxes?.forEach(box => {
            if(box instanceof HTMLDivElement){
                if(bookList.length % 2 === 0){
                    const half = box.getBoundingClientRect().width / 2;
                    box.style.left = half + 'px';
                }
            }
            markCenterBox(box as HTMLDivElement, 'left');
        });
    }
    
    const onClickSlide = (e: React.MouseEvent<HTMLOrSVGElement>)=>{
        const dir = e.currentTarget.dataset.left;
        moveTo(dir ? 'left' : 'right');
    }

    useEffect(()=>{
        initBoxPositoin();
        intervalId.current = window.setInterval(()=>{
            moveTo('left');
        }, 5000);
        return ()=> clearInterval(intervalId.current);
    });
    
    return (
        <div css={style} ref={divRef}>
            <div className='wrapper'>
                {bookList.map(b => (
                    <div key={b.id} className='box' style={{left: '0'}} data-move-box>
                        <img src={b.thumbnail}></img>
                    </div>
                ))}
            </div>
            <div className='buttons'>
                <IoIosArrowDropleftCircle size='40' color='rgb(255,255,255,0.6)' data-left onClick={onClickSlide}/>
                <IoIosArrowDroprightCircle size='40' color='rgb(255,255,255,0.6)' data-right onClick={onClickSlide}/>
            </div>
        </div>
    );
}

const style = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
            cursor: pointer;
            transition: .2s;
            filter: brightness(0.8);
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
    .buttons {
        position: absolute;
        width: 600px;
        display: flex;
        justify-content: space-between;
        svg {
            cursor: pointer;
        }
    }

    @keyframe slide {
        
    }
`;

export default MainSlider;
