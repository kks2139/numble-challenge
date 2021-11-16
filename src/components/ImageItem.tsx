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
}

function ImageItem({index, currentIndex, imgUrl}: Props) {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const distance = Math.abs(index - currentIndex);
    const isCenter = index === currentIndex;
    const isSide = distance >= 1;
    const isOutRange = distance >= 2;

    useEffect(()=>{
        imgRef.current!.style.transform = `translateX(${-1 * currentIndex}00%)`;
    }, [currentIndex]);

    return (
        <img css={style({isCenter, isSide, isOutRange})} src={imgUrl} ref={imgRef}></img>
    );
}

const style = ({isCenter, isSide, isOutRange}: StyleProps)=> (css`
    transition: .3s;
    border-radius: 7px;
    width: 100%;
    height: 100%;
    opacity: 1;
    ${isCenter ? `
        & {
            height: 286px;
        }
    ` : ''}
    ${isSide ? `
        // filter: brightness(0.7);
    ` : ''}
    ${isOutRange ? `
        opacity: 0.1;
    ` : ''}
`);

export default ImageItem;
