import React, {useEffect, useRef, useState} from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {BookData} from '../utils/interfaces';
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from 'react-icons/io';
import {ImageItem} from './index';

interface Props {
    bookList: BookData[]
}

function ImageSlider({bookList}: Props) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const center = Math.floor(bookList.length / 2);

    // center 정렬이라 가운데 아이템을 currentIndex = 0 이라고 잡음
    // currentIndex 를 기준으로 + - 값을 가지고 translateX 값으로써 좌우 이동을 만듬
    // currentIndex 가 기준이므로 index는 0 기준 좌우로 음수, 양수 값을 가지게 됨

    const onClickSlide = (e: React.MouseEvent<HTMLOrSVGElement>)=>{
        const {dir} = e.currentTarget.dataset;
        if(dir === 'left'){
            setCurrentIndex(currentIndex - 1);
        }else{
            setCurrentIndex(currentIndex + 1);
        }
    }

    useEffect(()=>{
        setCurrentIndex(0);
    }, [bookList]);

    return (
        <div css={style} ref={divRef}>
            <div className='wrapper'>
                {bookList.map((b, i) => (
                    <div key={b.id} className='box' data-move-box>
                        <ImageItem index={-1 * (center - i)} currentIndex={currentIndex} imgUrl={b.thumbnail}/>
                    </div>
                ))}
            </div>
            <div className='buttons'>
                <IoIosArrowDropleftCircle size='40' color='rgb(255,255,255,0.6)' data-dir='left' onClick={onClickSlide}/>
                <IoIosArrowDroprightCircle size='40' color='rgb(255,255,255,0.6)' data-dir='right' onClick={onClickSlide}/>
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
            display: flex;
            align-items: center;
            min-width: 414px;
            height: 276px;
            padding: 0 5px;
            cursor: pointer;
        }
    }
    .buttons {
        position: absolute;
        width: 600px;
        display: flex;
        justify-content: space-between;
        svg {
            box-shadow: 0 0 10px 0 black;
            cursor: pointer;
        }
    }

    @keyframe slide {
        
    }
`;

export default ImageSlider;
