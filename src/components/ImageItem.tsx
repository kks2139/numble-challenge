import React, {useState, useEffect, useRef} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

interface StyleProps {
    isCenter: boolean
    isSide: boolean
    isOutRange: boolean
}

interface Props {
    index: number
    currentIndex: number
    imgUrl: string
    isOdd?: boolean
    circulate: boolean
}

function ImageItem({index, currentIndex, imgUrl, isOdd=false, circulate}: Props) {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const distance = Math.abs(index - currentIndex);
    const isCenter = index === currentIndex;
    const isSide = distance >= 1;
    const isOutRange = distance >= 2;
    const moveValue = isOdd ? -1 * (currentIndex * 100 - 50) : currentIndex * 100; 

    useEffect(()=>{
        if(!circulate){
            const value = isOdd ? `calc(${-1 * currentIndex}00% - 50%)` : `${-1 * currentIndex}00%`; 
            imgRef.current!.style.transform = `translateX(${value})`;
        }
    }, [currentIndex]);

    return (
            <img css={style({isCenter, isSide, isOutRange})} src={imgUrl} ref={imgRef}></img>
    );
}

const style = ({isCenter, isSide, isOutRange}: StyleProps)=> (css`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 5px;
    opacity: 1;
    transition: .3s;
    border-radius: 10px;
    ${isCenter ? `
        & {
            height: 286px;
        }
    ` : ''}
    ${isSide ? `
        opacity: .8;
    ` : ''}
    ${isOutRange ? `
        opacity: 0;
    ` : ''}
`);

export default ImageItem;
