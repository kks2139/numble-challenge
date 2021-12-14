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
    imgUrl: string
    currentIndex: number
    onClickImage: (param: string)=> void
}

function ImageItem({index, imgUrl, currentIndex, onClickImage}: Props) {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const poistion = -1 * currentIndex * 100;
    const selected = index-1 === currentIndex;
    const vanish = Math.abs(index - 1 - currentIndex) > 1;

    const onClick = ()=>{
        onClickImage(imgUrl);
    }

    useEffect(()=>{
        imgRef.current!.style.transform = `translateX(${poistion}%)`;
    }, [currentIndex]);

    return (
            <img css={style(selected, vanish)} src={imgUrl} onClick={onClick} ref={imgRef}></img>
    );
}

const style = (selected: boolean, vanish: boolean)=> (css`
    position: relative;
    /* flex-grow: 1; */
    width: 414px;
    height: ${selected ? '286px' : '276px'};
    opacity: ${vanish ? 0 : 1};
    padding: 0 5px;
    transition: .3s;
    border-radius: 10px;
    cursor: pointer;
`);

export default ImageItem;
