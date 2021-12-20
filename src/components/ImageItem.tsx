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
    idxArr: number[]
    itemLength: number
    onClickImage: (param: string)=> void
}

function ImageItem({imgUrl, index, idxArr, itemLength, onClickImage}: Props) {
    const divRef = useRef<HTMLImageElement | null>(null);
    const poistion = 414 * idxArr[index];

    const onClick = ()=>{
        onClickImage(imgUrl);
    }

    useEffect(()=>{
        divRef.current!.style.transform = `translateX(${poistion}px)`;
    }, [idxArr]);

    return (
        <div css={style()} ref={divRef}>
            <img src={imgUrl} onClick={onClick}></img>
        </div>
    );
}

const style = ()=> (css`
    position: absolute;
    transition: .3s;
    img {
        width: 414px;
        height: 276px;
        padding: 0 5px;
        border-radius: 10px;
        cursor: pointer;
    }
`);

export default ImageItem;
