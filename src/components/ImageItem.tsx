import React, {useState, useEffect, useRef} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

interface StyleProps {
    isCenter: boolean
    isSide: boolean
    isOutRange: boolean
}

interface Props {
    imgUrl: string
    index: number
    move: number
    itemLength: number
    onClickImage: (param: string)=> void
}

function ImageItem({imgUrl, index, move, itemLength, onClickImage}: Props) {
    const divRef = useRef<HTMLImageElement | null>(null);
    // const toEnd = Math.abs(move) === index ? 

    const poistion = 414 * index + (move * 414);
    const vanish = Math.abs(index - move) > 2;

    const onClick = ()=>{
        onClickImage(imgUrl);
    }

    useEffect(()=>{
        divRef.current!.style.transform = `translateX(${poistion}px)`;
    }, [move]);

    return (
        <div css={style(vanish)} ref={divRef}>
            <img src={imgUrl} onClick={onClick}></img>
        </div>
    );
}

const style = (vanish: boolean)=> (css`
    position: absolute;
    transition: .3s;
    /* opacity: ${vanish ? 0 : 1}; */
    img {
        width: 414px;
        height: 276px;
        padding: 0 5px;
        border-radius: 10px;
        cursor: pointer;
    }
`);

export default ImageItem;
